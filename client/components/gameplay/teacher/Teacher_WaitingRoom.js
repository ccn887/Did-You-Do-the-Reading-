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
  async componentDidMount() {
    const gameId = this.props.match.params.pin
    const users = this.state.users
    let newUser = []
    try{
    await firebase.database().ref(`gameRooms/${gameId}/users`)
      .on('value', (snapshot) => {
        newUser = snapshot.val()
        this.setState({
          users: newUser || users
        })
      })
    }
    catch(err){
      console.error('Error mounting component:', err)
    }
  }

  async playGame(e) {
    e.preventDefault();


  }
  render() {
    const users = this.state.users && Object.keys(this.state.users)
    console.log('users:',this.state)
    const gamePin = this.props.match.params.pin
    return (
      <div>
        <h1>Enter the Pin to Join the Game!</h1>
        <h1>{gamePin}</h1>
        <ul>
        { users.length ? (users.map( user => {
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
      </div>
    )
  }
}

const mapState = state => {
  return { currentGame: state.currentGame }
}


export default connect(mapState)(TeacherWaitingRoom)
