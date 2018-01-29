import React, { Component } from 'react'
import { Card, Button } from 'semantic-ui-react'
import { setGameOnStateThunk, listenForGameStateChange, stopListeningForGameState } from '../../../store'
import { connect } from 'react-redux'
import firebase from '../../../../server/firebase'
import history from '../../../history'


export class StudentAnswerReveal extends Component {
  constructor() {
    super();

    this.nextQuestion = this.nextQuestion.bind(this)
  }

componentDidMount() {
    const currentGame = this.props.currentGame
    const gameRoomId = this.props.match.params.pin;
    const studentId = this.props.match.params.studentId
    const questionsArr = Object.keys(currentGame)
    const currentQuestionId = this.props.match.params.questionId
    const nextIndex = questionsArr.indexOf(currentQuestionId) + 1
    const nextId = questionsArr[nextIndex]

    this.props.setGameOnStateThunk(gameRoomId)
    this.props.listenForGameStateChange(gameRoomId);


    // try {
    //   const gameRoomId = this.props.match.params.pin;
    //   this.props.setGameOnStateThunk(gameRoomId)
    //   const gameRoomRef = firebase.database().ref(`gameRooms/${gameRoomId}/gameState`)
    //     .on('value', snapshot => {
    //       if (snapshot.val() === 'answeringQuestion') {
    //         const gameSecondStateRef = firebase.database().ref(`gameRooms/${gameRoomId}/gameState`)
    //           .on('value', snapshot => {
    //             if (snapshot.val() === 'askingQuestion') {
    //               this.nextQuestion()
    //             }
    //           })
    //       }
    //     })
    // }
    // catch (err) {
    //   console.error('could not get game state', err)
    // }
  }

  componentWillReceiveProps(nextProps){
    if (nextProps.gameState === 'askingQuestion' && this.props.gameState === 'answeringQuestion'){
      this.nextQuestion();
    }
  }

  nextQuestion() {
    const currentGame = this.props.currentGame
    const gameRoomId = this.props.match.params.pin;
    const studentId = this.props.match.params.studentId
    const questionsArr = Object.keys(currentGame)
    const currentQuestionId = this.props.match.params.questionId
    const nextIndex = questionsArr.indexOf(currentQuestionId) + 1
    const nextId = questionsArr[nextIndex]
    history.push(`/${gameRoomId}/question/${nextId}/${studentId}`)

  }

  render() {
    return (
      <h1> Waiting for Next Question...</h1>
    )
  }
}

const mapState = state => {
  return {
    currentGame: state.currentGame,
    currentQuestion: state.currentQuestion,
    gameState: state.gameState
  }
}
const mapDispatch = { setGameOnStateThunk, listenForGameStateChange, stopListeningForGameState}

export default connect(mapState, mapDispatch)(StudentAnswerReveal)
