import firebase from '../../../../server/firebase'
import React, { Component } from 'react'
import { Table, Container, Button } from 'semantic-ui-react'
import { connect } from 'react-redux'
import history from '../../../history'
import { setGameOnStateThunk, buildNewGameRoomThunk, getCurrentTeacherGames } from '../../../store'
import MakeQuiz from '../../MakeQuiz'

export class TeacherDashboard extends Component {
  constructor() {
    super()

  }
  componentDidMount() {
    this.props.getCurrentTeacherGames(this.props.user.id)
  }

  makeQuiz = (e) => {
    console.log('whyyyyyyy')
    e.preventDefault();
    history.push('/make-quiz')
  }
  playGame = (e) => {
    e.preventDefault();
    const pin = e.target.value
    history.push(`/teacher-waiting-room/${pin}`)
  }

  goToGraphs = (evt) => {
    evt.preventDefault();
    history.push(`/teacher/graphs`)
  }

  render() {
    const user = this.props.user
    const currentTeacherGames = this.props.currentTeacherGames

    return (
      <div>
        <h1>Welcome, {user.email} </h1>
        <Button size="large" color="purple" onClick={this.makeQuiz}>Make a New Game</Button>
        <Button size="large" color="orange" onClick={this.goToGraphs}>Look At Some Graphs</Button>
        <Container id="all-games-container" >

        <h1>Play a Previous Game: </h1>

          {
            currentTeacherGames.map(game => {
              return (
                <div key={game.pin} id="game-name">
                  {game.quizTitle}
                  <Button value={game.pin} onClick={this.playGame}>Play Game</Button>
                </div>
              )
            })
          }

        </Container>
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
