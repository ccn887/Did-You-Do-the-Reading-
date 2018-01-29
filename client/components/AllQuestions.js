import firebase from '../../server/firebase'
import React, { Component } from 'react'
import axios from 'axios'
import { Form, TextArea, Button, Message, Icon, Container } from 'semantic-ui-react'
import { me } from '../store';
import { connect } from 'react-redux'
import history from '../history'
import TeacherAddQuestion from '../components/gameplay/teacher/Teacher_AddQuestion'



export class AllQuestions extends Component {
  constructor() {
    super()
    this.state = {
      currentQuiz: {},
      teacherId: null,
      key: null,
      pin: '',
      showAddForm: false
    }
    this.saveQuiz = this.saveQuiz.bind(this)
    this.deleteQuestion = this.deleteQuestion.bind(this)
    this.showAddForm = this.showAddForm.bind(this);

  }

  async deleteQuestion(e, id) {
    e.preventDefault()
    try {
      const questionSetId = this.props.match.params.questionSetId
      const questionSetRef = await firebase.database().ref(`questionSets/${questionSetId}`).child(id)
        .once('value', async (snapshot) => {
          try {
            const questionSetRef = await firebase.database().ref(`questionSets/${questionSetId}`).child(id)
            questionSetRef.remove()
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
        .on('value', async (snapshot) => {
          try {
            currentQuiz = await snapshot.val()

            this.setState({
              currentQuiz: currentQuiz,
            })
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

  showAddForm(){
    this.setState({
      showAddForm: true
    })
  }

  render() {
    const quiz = this.state.currentQuiz
    const quizArr = Object.keys(quiz)
    const showAddForm = this.state.showAddForm;

    return (
      <div>
      <Container id="all-questions-container">
        <h2>edit your quiz below</h2>
        {
          quizArr.length ?
            (quiz && quizArr.map((question) => {

              return (
                <div key={question}>
                  <Message className='question-edit-box' color='teal'>
                    <div className='question-edit-flex'>
                      <h3 >{quiz[question].question} </h3>
                      <Button onClick={(e) => { this.deleteQuestion(e, question) }}>
                        <Icon name="trash"></Icon>
                      </Button>
                    </div>
                    <div>
                      {quiz[question].answers.map(answer => {
                        if(answer === quiz[question].rightAnswer){
                          return (
                            <div className='right-answer-flex' key={answer}>
                              <div>{answer}</div>
                              <Icon color="olive" name="checkmark"></Icon>
                            </div>
                          )
                        } else {
                          return (
                            <div key={answer}>
                              <div>{answer}</div>
                            </div>
                          )
                        }
                      })
                    }
                    </div>
                  </Message>
                </div>
              )


            })) : <div />
        }
        <div className="two-button-flex">
          <Button color="orange" onClick={this.showAddForm}>Add Another Question</Button>
          <Button color="purple" onClick={this.saveQuiz}>Generate Quiz</Button>
        </div>
        {showAddForm && <TeacherAddQuestion match={this.props.match} />}
        </Container>
      </div>
    )
  }
}

const mapState = state => {
  return { user: state.user }
}

const mapDispatch = { me }

export default connect(mapState, mapDispatch)(AllQuestions)
