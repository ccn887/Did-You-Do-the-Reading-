import React, { Component } from 'react'
import { Card } from 'semantic-ui-react'
import history from '../../../history'
import { setGameOnStateThunk, setCurrentQuestionThunk, updateGameState, fetchTotalQuestions, determineQuestionNumber } from '../../../store'
import { connect } from 'react-redux'



export class TeacherSingleQuestion extends Component {
  constructor() {
    super();
    this.state = {
      timer: null,
      counter: 20,
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
    this.setState({counter: 20, nextQuestionId: null})
  }

  tick = () => {
    if (this.state.counter === 0) {
      this.setState({ counter: 20 })
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
          <div>
            <div>
              <h2>Question {this.props.questionCounter}/{this.props.totalQuestions}</h2>
              <Card>
                <h1 id="teacher-single-question">{currentQuestion && currentQuestion.question}</h1>
              </Card>
              <Card.Group itemsPerRow={2}>
                <Card className="teacher-single-answer">{answerArray.length && answerArray[0]}</Card>
                <Card className="teacher-single-answer">{answerArray.length && answerArray[1]}</Card>
                <Card className="teacher-single-answer">{answerArray.length && answerArray[2]}</Card>
                <Card className="teacher-single-answer">{answerArray.length && answerArray[3]}</Card>
              </Card.Group>
            </div>
            <div>
              <div>Time Remaining: {this.state.counter}</div>
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
