import firebase from '../../../../server/firebase'
import React, { Component } from 'react'
import { Form, TextArea, Button } from 'semantic-ui-react'
import { connect } from 'react-redux'
import history from '../../../history'
import { setGameOnStateThunk, stopListeningForNewStudents, listenForNewStudents, listenForGameStateChange, stopListeningForGameState } from '../../../store'


export class StudentWaitingRoom extends Component {
  constructor() {
    super()
    this.playGame = this.playGame.bind(this)

  }
  componentDidMount() {
    const userId = this.props.match.params.studentId
    const gameId = this.props.match.params.pin

    this.props.setGameOnStateThunk(gameId)

    this.props.listenForNewStudents(gameId);
    this.props.listenForGameStateChange(gameId);


}

componentWillReceiveProps(nextProps){
  const gameId = this.props.match.params.pin
  const userId = this.props.match.params.studentId


  const currentGame = this.props.currentGame
  const questionsArr = Object.keys(currentGame)
  console.log('current:', questionsArr)
  const firstQuestionId = questionsArr[0]
  console.log('firstQuestionId', firstQuestionId)

  if (nextProps.gameState === 'askingQuestion'){
    history.push(`/${gameId}/question/${firstQuestionId}/${userId}`)
  }
}

  componentWillUnmount () {
    const gameId = this.props.match.params.pin
    this.props.stopListeningForNewStudents(gameId);
    this.props.stopListeningForGameState(gameId);
  }


  playGame (e) {
    e.preventDefault();
  }

  render() {
    const users = Object.keys(this.props.currentStudents)
    const currentStudents = this.props.currentStudents
    return (
      <div>
        <h1>Waiting for the Game to Start!</h1>
        <ul>
          {users.length && users.map(user => {
            return (
              <li key={user}>
                {currentStudents[user]}
              </li>
            )
          })
          }
        </ul>
      </div>
    )
  }
}

const mapState = state => {
  return {
    currentGame: state.currentGame,
    currentStudents: state.currentStudents,
    gameState: state.gameState
  }
}
const mapDispatch = { setGameOnStateThunk, stopListeningForNewStudents, listenForNewStudents, listenForGameStateChange, stopListeningForGameState}


export default connect(mapState, mapDispatch)(StudentWaitingRoom)
