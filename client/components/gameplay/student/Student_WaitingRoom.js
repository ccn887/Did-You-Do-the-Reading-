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
    // REVIEW: cleaning up after ourselves
    //         do we want this in the store?
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

const mapDispatch = (dispatch) => {
  listenToGameRoom: (gameId) => {
    dispatch(listenToGameRoom(gameId))
  },
  unlistenFromGameRoom: (gameId) => {
    dispatch(unlistenFromGameRoom(gameId))
  },
}


export default connect(mapState)(StudentWaitingRoom)
