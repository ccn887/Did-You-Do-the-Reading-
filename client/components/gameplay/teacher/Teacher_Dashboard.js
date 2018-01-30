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
    this.state = {
      showForm: false
    }
    this.playGame = this.playGame.bind(this)
    this.showForm = this.showForm.bind(this)

  }
  componentDidMount() {
    this.props.getCurrentTeacherGames(this.props.user.id)
  }

  showForm(e) {
    e.preventDefault();
    this.setState({
      showForm: true
    })
  }

  playGame(e) {
    e.preventDefault();
    const pin = e.target.value
    history.push(`/teacher-waiting-room/${pin}`)
  }

  render() {
    const user = this.props.user
    const currentTeacherGames = this.props.currentTeacherGames
    const showForm = this.state.showForm

    return (
      <div>
        <h1>Welcome, {user.email} </h1>
        <Button size="large" color="purple" onClick={this.showForm}>Make a New Game</Button>
        {showForm && <MakeQuiz />}
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
