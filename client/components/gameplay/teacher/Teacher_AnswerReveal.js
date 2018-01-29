import React, { Component } from 'react'
import firebase from '../../../../server/firebase'
import { connect } from 'react-redux'
import { setGameOnStateThunk, setCurrentQuestionThunk } from '../../../store'
import history from '../../../history'
import { Card, Button } from 'semantic-ui-react'



export class TeacherAnswerReveal extends Component {
  constructor() {
    super()

    this.nextQuestion = this.nextQuestion.bind(this)
  }

  componentDidMount() {
    const gameRoomId = this.props.match.params.pin;
    const questionId = this.props.match.params.questionId;
    this.props.setGameOnStateThunk(gameRoomId)
    this.props.setCurrentQuestionThunk(questionId, gameRoomId)
  }
  nextQuestion() {
    const currentGame = this.props.currentGame
    const gameRoomId = this.props.match.params.pin;
    const questionsArr = Object.keys(currentGame)
   const currentQuestionId = this.props.match.params.questionId
    const nextIndex = questionsArr.indexOf(currentQuestionId) + 1
    const nextId = questionsArr[nextIndex]
    const gameStateRef = firebase.database().ref(`gameRooms/${gameRoomId}/gameState`)
    .set('askingQuestion')
    history.push(`/teacher/${gameRoomId}/question/${nextId}`)

  }
  render() {
    const currentQuestion = this.props.currentQuestion.question || ''
    const rightAnswer = this.props.currentQuestion.rightAnswer || ''
    return (
      <div>
        <h1>{currentQuestion}</h1>
        <h1>{rightAnswer}</h1>
        <Button className="ui button teal" onClick={this.nextQuestion}> Next Question</Button>
      </div>
    )
  }

}

const mapState = state => {
  return {
    currentGame: state.currentGame,
    currentQuestion: state.currentQuestion
  }
}

const mapDispatch = { setGameOnStateThunk, setCurrentQuestionThunk }

export default connect(mapState, mapDispatch)(TeacherAnswerReveal)

