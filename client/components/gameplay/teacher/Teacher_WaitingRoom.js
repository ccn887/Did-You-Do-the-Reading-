import firebase from '../../../../server/firebase'
import React, { Component } from 'react'
import { Form, TextArea, Button } from 'semantic-ui-react'
import { connect } from 'react-redux'
import history from '../../../history'
import { setGameOnStateThunk, listenForNewStudents, stopListeningForNewStudents, updateGameState } from '../../../store'

export class TeacherWaitingRoom extends Component {
  constructor() {
    super();
    this.playGame = this.playGame.bind(this)

  }
  componentDidMount() {
    const gameId = this.props.match.params.pin

    this.props.setGameOnStateThunk(gameId)


    this.props.listenForNewStudents(gameId);
  }

  componentWillUnmount(){
    const gameId = this.props.match.params.pin;
    this.props.stopListeningForNewStudents(gameId);
  }

playGame(e) {
    e.preventDefault();
    const currentGame = this.props.currentGame
    const gameRoomId = this.props.match.params.pin;
    const questionsArr = Object.keys(currentGame)
    const firstQuestionId = questionsArr[0]
    this.props.updateGameState(gameRoomId, 'askingQuestion')
    history.push(`/teacher/${gameRoomId}/question/${firstQuestionId}`)
  }
  render() {
    const users = Object.keys(this.props.currentStudents);

    const gamePin = this.props.match.params.pin

    return (
      <div>
        <h1>Enter the Pin to Join the Game!</h1>
        <h1>{gamePin}</h1>
        <ul>
        {users.length ? (users.map( user => {
            return (
              <li key={user}>
                {user}
              </li>
            )
        }))
        : (
          <div>Waiting for contestants...</div>
        )
          }
        </ul>
        <Button onClick={this.playGame}>Start theQuiz!</Button>
      </div>
    )
  }
}

const mapState = state => {
  return { currentGame: state.currentGame, currentStudents: state.currentStudents, gameState: state.gameState }
}

const mapDispatch = { setGameOnStateThunk, listenForNewStudents, stopListeningForNewStudents, updateGameState}

export default connect(mapState, mapDispatch)(TeacherWaitingRoom)
