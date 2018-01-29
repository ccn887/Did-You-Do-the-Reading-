import firebase from '../../../../server/firebase'
import React, { Component } from 'react'
import { Card, Button } from 'semantic-ui-react'
import history from '../../../history'
import { Redirect } from 'react-router-dom'
import { setGameOnStateThunk, setCurrentQuestionThunk } from '../../../store'
import { connect } from 'react-redux'



export class StudentSingleQuestion extends Component {
  constructor() {
    super();

    this.submitAnswer = this.submitAnswer.bind(this);

  }

  componentDidMount() {

    const gameRoomId = this.props.match.params.pin;
    const questionId = this.props.match.params.questionId;
    const studentId = this.props.match.params.studentId
    this.props.setGameOnStateThunk(gameRoomId)
    this.props.setCurrentQuestionThunk(questionId, gameRoomId)
    const currentGame = this.props.currentGame
    const gameRoomRef = firebase.database().ref(`gameRooms/${gameRoomId}/gameState`)
      .on('value', snapshot => {
        if (snapshot.val() === 'answeringQuestion') {
          history.push(`/${gameRoomId}/waiting/${questionId}/${studentId}`)
        }

      })
    }
  submitAnswer(e){
        e.preventDefault();
        const questionObj = this.props.currentQuestion
    const questionId = this.props.match.params.questionId;
        const studentId = this.props.match.params.studentId
    const gameRoomId = this.props.match.params.pin;
        const rightAnswer = questionObj.rightAnswer
    if(e.target.value === rightAnswer) {
          const usersRef = firebase.database().ref(`users/${studentId}/score`)
            .transaction(function (score) {
              return score + 1
            })
          const usersRefStreak = firebase.database().ref(`users/${studentId}/streak`)
            .transaction(function (streak) {
              return streak + 1
            })
        } else {
          const usersLosingRef = firebase.database().ref(`users/${studentId}/streak`)
            .transaction(function (streak) {
              return 0
            })

        }
    history.push(`/${gameRoomId}/waiting/${questionId}/${studentId}`)

      }

  render() {
        const gameRoomId = this.props.match.params.pin;
        const questionId = this.props.match.params.questionId;
        const currentQuestion = this.props.currentQuestion
    const answerArray = currentQuestion.answers ? Object.values(currentQuestion.answers) : []

    // const answerArray = indexArray.map(index => {
    //   return currentQuestion.answers[index]
    // });



    return(
      <div>
            <div>
              <div>
                <Card>
                  <h1 id="student-single-question">{currentQuestion && currentQuestion.question}</h1>
                </Card>
                <Button value={answerArray[0]} onClick={this.submitAnswer} className="student-single-answer">{answerArray.length && answerArray[0]}</Button>
                <Button value={answerArray[1]} onClick={this.submitAnswer} className="student-single-answer">{answerArray.length && answerArray[1]}</Button>
                <Button value={answerArray[2]} onClick={this.submitAnswer} className="student-single-answer">{answerArray.length && answerArray[2]}</Button>
                <Button value={answerArray[3]} onClick={this.submitAnswer} className="student-single-answer">{answerArray.length && answerArray[3]}</Button>
              </div>
            </div>
      </div >
    )
  }


}

const mapState = state => {
  return {
    currentGame: state.currentGame,
    currentQuestion: state.currentQuestion,
    currentStudent: state.currentStudent
  }
}
const mapDispatch = { setGameOnStateThunk, setCurrentQuestionThunk }

export default connect(mapState, mapDispatch)(StudentSingleQuestion)
