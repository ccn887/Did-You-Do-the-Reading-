import React, { Component } from 'react'
import { setGameOnStateThunk, listenForNewStudents, listenForGameStateChange, storeStudentGameHistory,
  stopListeningForGameState, getSingleStudentListener, stopListeningForSingleStudent,
  resetStudentScore, fetchTotalQuestions, breakStudentStreak } from '../../../store'
import { connect } from 'react-redux'
import history from '../../../history'
import Leaderboard from '../../Leaderboard'
import { Link } from 'react-router-dom'
import { Button } from 'semantic-ui-react'


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
    this.props.fetchTotalQuestions(this.props.match.params.pin)
    this.props.listenForNewStudents(this.props.match.params.pin);
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
      const sId = this.state.studentId
      const gId = this.state.gameRoomId
      const score =  Math.floor((+this.props.singleStudent.score / +this.props.totalQuestions) * 100)
      if (score >= 0 && score <= 100){
        this.props.storeStudentGameHistory(sId, gId, score, this.props.email)
      }
      this.props.resetStudentScore(sId)
      this.props.breakStudentStreak(sId)
      history.replace(`/${gId}/gameOver/${sId}`)
    }
  }

  componentWillUnmount() {
    this.props.stopListeningForSingleStudent(this.props.match.params.studentId)
    this.props.stopListeningForGameState(this.props.match.params.pin);
  }

  nextQuestion() {
    const currentGame = this.props.currentGame
    const questionsArr = Object.keys(currentGame)
    const currentQuestionId = this.props.match.params.questionId
    const nextIndex = questionsArr.indexOf(currentQuestionId) + 1
    const nextId = questionsArr[nextIndex]

    history.replace(`/${this.state.gameRoomId}/question/${nextId}/${this.state.studentId}`)

  }

  render() {
    const currentStudent = this.props.singleStudent
    return (
      <div>
      <div id="student-answer-wrapper">
        <h1>The answer was <u><i>{this.props.currentQuestion.rightAnswer}</i></u></h1>
        <h1> Waiting for Next Question...</h1>
        <h2>Your Score:  {currentStudent.score}</h2>
        {
          currentStudent.streak > 2 &&
          <center>
          <h2>You're on Fire! You've correctly answered {currentStudent.streak} questions in a row!</h2>
          </center>
        }
        <br />
        <Leaderboard />
        <div id="exit-out">
          <h5>Need to leave the game?</h5>
          <Link to="/"> <Button id="game-quick-exit-button" color="red">Exit</Button></Link>
        </div>
      </div>
      </div>
    )
  }
}


const mapState = state => {
  return {
    currentGame: state.currentGame,
    currentQuestion: state.currentQuestion,
    gameState: state.gameState,
    singleStudent: state.singleStudent,
    totalQuestions: state.totalQuestions,
    email: state.firebaseUser.email
  }
}
const mapDispatch = {
  setGameOnStateThunk,
  listenForGameStateChange,
  stopListeningForGameState,
  getSingleStudentListener,
  stopListeningForSingleStudent,
  storeStudentGameHistory,
  resetStudentScore,
  fetchTotalQuestions,
  breakStudentStreak,
  listenForNewStudents
}

export default connect(mapState, mapDispatch)(StudentAnswerReveal)
