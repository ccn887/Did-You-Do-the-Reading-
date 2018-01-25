import firebase from '../../server/firebase'
import React, { Component } from 'react'
import axios from 'axios'
import { Form, TextArea, Button } from 'semantic-ui-react'
import { me } from '../store';
import { connect } from 'react-redux'
import history from '../history'



export class AllQuestions extends Component {
  constructor() {
    super()
    this.state = {
      currentQuiz: [],
      teacherId: null,
      pin: ''
    }
    this.saveQuiz = this.saveQuiz.bind(this)
    // this.deleteQuestion = this.deleteQuestion.bind(this)
    // this.getQuiz = this.getQuiz.bind(this)


    //addQuestion, updatequestion
    //edit answer
  }
  async deleteQuestion(e) {
    e.preventDefault()
    //deleteQuestionFromFB
  }
  async saveQuiz(e) {
    e.preventDefault();
    const pin = Math.floor(Math.random() * 90000) + 10000;
    const quiz = this.state.currentQuiz
    const teacherId = this.props.user.id
    try {
      const gameRoomRef = firebase.database().ref('gameRooms');
      let newGameRoomRef = gameRoomRef.child(pin).set({
        quiz: quiz,
        teacherId: teacherId,
        pin: pin
      })
      history.push(`/teacher-waiting-room/${pin}`)


    }
    catch (err) {
      console.log(err)
    }
  }
  async componentDidMount() {
    let currentQuiz
    try {
      const questionSetId = this.props.match.params.questionSetId
      const questionSetRef = await firebase.database().ref(`questionSets/${questionSetId}`)
        .once('value', async (snapshot) => {
          try {
            currentQuiz = await snapshot.val()
            this.setState({ currentQuiz: currentQuiz })
          }
          catch (err) {
            console.log(err)
          }
        })
    }
    catch (err) {
      console.log(err)
    }

  }
  render() {
    const quiz = this.state.currentQuiz
    return (
      <div>
        <h1>Edit Your Current Quiz Below</h1>
        {
          quiz.length && quiz.map(question => {
            return (
              <div key={question.rightAnswer}>
                <div>{question.question}</div>
                <div>{question.rightAnswer}</div>
                <div>{question.wrongAnswers[0]}</div>
                <div>{question.wrongAnswers[1]}</div>
                <div>{question.wrongAnswers[2]}</div>

              </div>
            )

          })}
        <button onClick={this.saveQuiz}>Click here for next thing</button>
      </div>
    )
  }
}

const mapState = state => {
  return { user: state.user }
}

const mapDispatch = { me }

export default connect(mapState, mapDispatch)(AllQuestions)
