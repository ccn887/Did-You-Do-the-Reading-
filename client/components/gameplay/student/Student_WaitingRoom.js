import firebase from '../../../../server/firebase'
import React, { Component } from 'react'
import { Form, TextArea, Button } from 'semantic-ui-react'
import { connect } from 'react-redux'

export class StudentWaitingRoom extends Component {
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


export default connect(mapState)(StudentWaitingRoom)
