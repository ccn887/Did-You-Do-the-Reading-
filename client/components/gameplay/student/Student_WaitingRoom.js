import firebase from '../../../../server/firebase'
import React, { Component } from 'react'
import { Form, TextArea, Button } from 'semantic-ui-react'
import { connect } from 'react-redux'
import history from '../../../history'
import { setGameOnStateThunk } from '../../../store'


export class StudentWaitingRoom extends Component {
  constructor() {
    super()
    this.state = {
      users: [],
      currentGame: ''
    }
    this.playGame = this.playGame.bind(this)

  }
  async componentDidMount() {
    try{
    const gameId = this.props.match.params.pin
    await this.props.setGameOnStateThunk(gameId)
    const userId = this.props.match.params.studentId
    const currentGame = this.props.currentGame
    const questionsArr = Object.keys(currentGame)
    console.log('current:', questionsArr)
    const firstQuestionId = questionsArr[0]
    console.log('firstQuestionId', firstQuestionId)
    const users = this.state.users
    const gameRoomRef = firebase.database().ref(`gameRooms/${gameId}/users`)
      .on('value', (snapshot) => {
        let newuser = snapshot.val()
        this.setState({
          users: newuser
        })
      })
    const gameStateRef = firebase.database().ref(`gameRooms/${gameId}/gameState`)
    .on('value', snapshot =>{
      if(snapshot.val() === 'askingQuestion'){
        history.push(`/${gameId}/question/${firstQuestionId}/${userId}`)
      }
    })
  }
  catch(err){
    console.log('could not mount:', err)
  }
}

  async playGame(e) {
    e.preventDefault();


  }
  render() {
    const users = Object.keys(this.state.users)

    return (
      <div>
        <h1>Waiting for the Game to Start!</h1>
        <ul>
          {users.length && users.map(user => {
            return (
              <li key={user}>
                {user}
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
  return { currentGame: state.currentGame }
}
const mapDispatch = { setGameOnStateThunk}


export default connect(mapState, mapDispatch)(StudentWaitingRoom)
