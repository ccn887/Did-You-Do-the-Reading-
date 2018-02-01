import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setGameOnStateThunk, setCurrentQuestionThunk, updateGameState, listenForNewStudents, stopListeningForNewStudents } from '../../../store'
import history from '../../../history'
import { Button } from 'semantic-ui-react'
import Leaderboard from '../../Leaderboard'


export class TeacherAnswerReveal extends Component {
  constructor() {
    super()
    this.state = {
      gameRoomId: '',
      questionId: '',
    }

    this.nextQuestion = this.nextQuestion.bind(this)
    this.endGame = this.endGame.bind(this)
  }

  componentDidMount() {
    this.props.setGameOnStateThunk(this.props.match.params.pin)
    this.props.setCurrentQuestionThunk(this.props.match.params.questionId, this.props.match.params.pin)
    this.props.listenForNewStudents(this.props.match.params.pin);
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      gameRoomId: this.props.match.params.pin,
      questionId: this.props.match.params.questionId
    })

  }

  nextQuestion() {
    const currentGame = this.props.currentGame
    const gameRoomId = this.props.match.params.pin;
    const questionsArr = Object.keys(currentGame)
    const currentQuestionId = this.props.match.params.questionId
    const nextIndex = questionsArr.indexOf(currentQuestionId) + 1
    const nextId = questionsArr[nextIndex]

    this.props.updateGameState(gameRoomId, 'askingQuestion');
    history.push(`/teacher/${gameRoomId}/question/${nextId}`)
  }

  endGame() {
    const gameRoomId = this.props.match.params.pin

    this.props.updateGameState(gameRoomId, 'gameOver')
    history.push(`/teacher/${gameRoomId}/gameOver`)
  }

  render() {

    const currentGame = this.props.currentGame
    const questionsArr = Object.keys(currentGame)
    const currentQuestionId = this.props.match.params.questionId

    let lastQuestion;
    if (questionsArr.indexOf(currentQuestionId) === questionsArr.length - 1){
      lastQuestion = true;
    } else {
      lastQuestion = false;
    }

    const currentQuestion = this.props.currentQuestion.question || ''
    const rightAnswer = this.props.currentQuestion.rightAnswer || ''
    return (
      <div>
        <h1>{currentQuestion}</h1>
        <h1>{rightAnswer}</h1>
        {
          lastQuestion ?
          <Button className="ui button purple" onClick={this.endGame}> End Game</Button> :
          <Button className="ui button teal" onClick={this.nextQuestion}> Next Question</Button>
        }
        {
          this.props.currentStudents.length > 0 ?
          <Leaderboard />
            :
              <div>NOPE</div>
          }

      </div>
    )
  }

}

const mapState = state => {
  return {
    currentGame: state.currentGame,
    currentQuestion: state.currentQuestion,
    currentStudents: state.currentStudents,
  }
}

const mapDispatch = { setGameOnStateThunk, setCurrentQuestionThunk, updateGameState, stopListeningForNewStudents, listenForNewStudents }

export default connect(mapState, mapDispatch)(TeacherAnswerReveal)
