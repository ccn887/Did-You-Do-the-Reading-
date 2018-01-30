import firebase from '../../../../server/firebase'
import React, { Component } from 'react'
import { Table, Container, Button } from 'semantic-ui-react'
import { connect } from 'react-redux'
import history from '../../../history'
import { setGameOnStateThunk, buildNewGameRoomThunk, getCurrentTeacherGames } from '../../../store'

export class TeacherDashboard extends Component {
  constructor() {
  super()

  }
  componentDidMount(){
this.props.getCurrentTeacherGames(this.props.user.id)
  }

  render(){
    const user = this.props.user
    const currentTeacherGames = this.props.currentTeacherGames
    console.log('games?', currentTeacherGames)
    return(
      <div>
      <h1>Welcome, {user.email} </h1>
      <h1>Play a Previous Game: </h1>
      <ul>
       {
        currentTeacherGames.map(game => {
          return (
            <li key={game.pin}>
          Game Pin: {game.pin}
          <Button>Play Game</Button>
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
    user: state.user,
    currentTeacherGames: state.currentTeacherGames
  }
}

const mapDispatch = { setGameOnStateThunk, buildNewGameRoomThunk, getCurrentTeacherGames }

export default connect(mapState, mapDispatch)(TeacherDashboard)
