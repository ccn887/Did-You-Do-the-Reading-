import React, { Component } from 'react'
import { Card, Message } from 'semantic-ui-react'
import history from '../../../history'
import { setGameOnStateThunk, setCurrentQuestionThunk, updateGameState, fetchTotalQuestions, determineQuestionNumber } from '../../../store'
import { connect } from 'react-redux'
import HeaderSmall  from '../../HeaderSmall'



export class TeacherSingleQuestion extends Component {
  constructor() {
    super();
    this.state = {
      timer: null,
      counter: 10,
      nextQuestionId: null
    }
  }

  componentDidMount() {
    const gameRoomId = this.props.match.params.pin;
    const questionId = this.props.match.params.questionId;

    this.props.determineQuestionNumber(questionId, this.props.currentGame)

    this.props.setGameOnStateThunk(gameRoomId)
    this.props.setCurrentQuestionThunk(questionId, gameRoomId)
    this.props.fetchTotalQuestions(gameRoomId)

    this.timer = setInterval(this.tick, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer)
    this.setState({counter: 10, nextQuestionId: null})
  }

  tick = () => {
    if (this.state.counter === 0) {
      this.setState({ counter: 10 })
    } else {
      this.setState({ counter: this.state.counter - 1 });
    }
  }

  gameChangeState = () => {
    const gameRoomId = this.props.match.params.pin;
    const questionId = this.props.match.params.questionId;
    this.props.updateGameState(gameRoomId, 'answeringQuestion');
    history.push(`/teacher/${gameRoomId}/answer/${questionId}`)
  }

  render() {

    const counter = this.state.counter;
    const currentQuestion = this.props.currentQuestion
    const answerArray = currentQuestion.answers ? Object.values(currentQuestion.answers) : []


    if (counter === 0) {
      return (
        <div>{this.gameChangeState()}</div>
      )
    } else {

      return (
        <div>
          <HeaderSmall />
          <hr />
          <div>
            <div>
              <h2>Question {this.props.questionCounter}/{this.props.totalQuestions}</h2>
              <Message id='question-box' color='teal'>
                <h1 id="teacher-single-question">{currentQuestion && currentQuestion.question}</h1>
              </Message >
              <div className="answer-box">
                <div className="teacher-single-answer">{answerArray.length && answerArray[0]}</div>
                <div className="teacher-single-answer">{answerArray.length && answerArray[1]}</div>
              </div>
              <div className="answer-box">
                <div className="teacher-single-answer">{answerArray.length && answerArray[2]}</div>
                <div className="teacher-single-answer">{answerArray.length && answerArray[3]}</div>
              </div>
            </div>
            <div>
              <div>
                <h2 id="time-remaining">Time Remaining: </h2>
              </div>
              <div id="timer-box">
                <h1 id="timer">{this.state.counter}</h1>
              </div>
            </div>
          </div>
        </div>
      )
    }
  }

}

const mapState = state => {
  return {
    currentGame: state.currentGame,
    currentQuestion: state.currentQuestion,
    gameState: state.gameState,
    totalQuestions: state.totalQuestions,
    questionCounter: state.questionCounter
  }
}
const mapDispatch = { setGameOnStateThunk, setCurrentQuestionThunk, updateGameState, fetchTotalQuestions, determineQuestionNumber }

export default connect(mapState, mapDispatch)(TeacherSingleQuestion)
