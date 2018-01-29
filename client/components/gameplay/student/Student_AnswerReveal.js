import React, { Component } from 'react'
import { setGameOnStateThunk, listenForGameStateChange, stopListeningForGameState } from '../../../store'
import { connect } from 'react-redux'
import history from '../../../history'


export class StudentAnswerReveal extends Component {
  constructor() {
    super();
    this.state = {
      gameRoomId: '',
      studentId: ''
    }
    this.nextQuestion = this.nextQuestion.bind(this)
  }

  componentDidMount() {

    this.props.setGameOnStateThunk(this.props.match.params.pin)
    this.props.listenForGameStateChange(this.props.match.params.pin);
  }

  componentWillReceiveProps(nextProps){

    this.setState({
      gameRoomId: this.props.match.params.pin,
      studentId: this.props.match.params.studentId
    })

    if (nextProps.gameState === 'askingQuestion' && this.props.gameState === 'answeringQuestion'){
      this.nextQuestion();
    }
    if (nextProps.gameState === 'gameOver'){
      console.log('helloooooo game over!')
      history.push(`/${this.state.gameRoomId}/gameOver/${this.state.studentId}`)
    }
  }

  nextQuestion() {
    const currentGame = this.props.currentGame
    const questionsArr = Object.keys(currentGame)
    const currentQuestionId = this.props.match.params.questionId
    const nextIndex = questionsArr.indexOf(currentQuestionId) + 1
    const nextId = questionsArr[nextIndex]

    history.push(`/${this.state.gameRoomId}/question/${nextId}/${this.state.studentId}`)

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
