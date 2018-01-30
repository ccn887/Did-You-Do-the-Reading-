import React, { Component } from 'react'
import { setGameOnStateThunk, listenForGameStateChange, stopListeningForGameState, getSingleStudentListener, stopListeningForSingleStudent } from '../../../store'
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
    this.props.getSingleStudentListener(this.props.match.params.studentId)
    this.props.setGameOnStateThunk(this.props.match.params.pin)
    this.props.listenForGameStateChange(this.props.match.params.pin);
  }

  componentWillReceiveProps(nextProps) {

    this.setState({
      gameRoomId: this.props.match.params.pin,
      studentId: this.props.match.params.studentId
    })

    if (nextProps.gameState === 'askingQuestion' && this.props.gameState === 'answeringQuestion') {
      this.nextQuestion();
    }
    if (nextProps.gameState === 'gameOver') {
      history.push(`/${this.state.gameRoomId}/gameOver/${this.state.studentId}`)
    }
  }

  componentWillUnmount() {
    this.props.getSingleStudentListener(this.props.match.params.studentId)
    this.props.stopListeningForGameState(this.props.match.params.pin);
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
    const currentStudent = this.props.singleStudent
    return (
      <div>
        <h1> Waiting for Next Question...</h1>
        <h2>Your Score:  {currentStudent.score}</h2>
        {
          currentStudent.streak > 2 &&
          <h2>You're on Fire! You've correctly answered {currentStudent.streak} questions in a row!</h2>
        }
      </div>
    )
  }
}

const mapState = state => {
  return {
    currentGame: state.currentGame,
    currentQuestion: state.currentQuestion,
    gameState: state.gameState,
    singleStudent: state.singleStudent
  }
}
const mapDispatch = { setGameOnStateThunk, listenForGameStateChange, stopListeningForGameState, getSingleStudentListener, stopListeningForSingleStudent }

export default connect(mapState, mapDispatch)(StudentAnswerReveal)
