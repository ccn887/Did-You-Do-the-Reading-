import firebase from '../../../../server/firebase'
import React, { Component } from 'react'
import { Form, TextArea, Button } from 'semantic-ui-react'
import { connect } from 'react-redux'

export class TeacherWaitingRoom extends Component {
  constructor() {
    super()
    this.state = {
      users: [],
      currentGame: ''
    }
    this.playGame = this.playGame.bind(this)

  }
  componentDidMount() {
    const gameId = this.props.match.params.pin
    const users = this.state.users
    const gameRoomRef = firebase.database().ref(`gameRooms/${gameId}/users`)
      .on('value', (snapshot) => {
        let newuser = snapshot.val()
        this.setState({
          users: newuser
        })
      })
  }

  async playGame(e) {
    e.preventDefault();


  }
  render() {
    const users = Object.keys(this.state.users)
    console.log('users:',users)
    const gamePin = this.props.match.params.pin
    return (
      <div>
        <h1>Enter the Pin to Join the Game!</h1>
        <h1>{gamePin}</h1>
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


export default connect(mapState)(TeacherWaitingRoom)
