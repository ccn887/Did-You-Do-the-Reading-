import firebase from '../../../../server/firebase'
import React, { Component } from 'react'
import { Table, Container, Button, Grid } from 'semantic-ui-react'
import { connect } from 'react-redux'
import history from '../../../history'
import { setGameOnStateThunk, buildNewGameRoomThunk, getCurrentTeacherGames } from '../../../store'
import MakeQuiz from '../../MakeQuiz'
import Navbar from '../../Navbar'
import HeaderSmall  from '../../HeaderSmall'

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
    console.log( this.props.currentTeacherGames)

    return (
      <div>
        <HeaderSmall />
        <Navbar />
        <div className="teacher-wrapper">
          <h2 id="welcome-message">Welcome, {user.email} </h2>
          <div className="teacher-menu">
            <h2 id="teach-menu-label"> Teacher Menu </h2>
            <Button className="teacher-menu-button"  color="purple" onClick={this.makeQuiz}>Make a New Game</Button>
            <Button className="teacher-menu-button"  color="purple" onClick={this.goToGraphs}>View Student Progress Graphs</Button>
          <h1 id="play-prev-game">Play a Previous Game: </h1>
          <Container className="all-games-second-container">
            <Grid>
              {
                currentTeacherGames.map(game => {
                  return (
                    <Grid.Row>
                      <Grid.Column width={12} key={game.pin} id="game-name">
                        {game.quizTitle}
                      </Grid.Column>
                      <Grid.Column width={4}>
                        <Button value={game.pin} className="play-game-button" onClick={this.playGame}>Play Game</Button>
                      </Grid.Column>
                    </Grid.Row>
                  )
                })
              }
            </Grid>
          </Container>
          </div>
        </div>
      </div>
    )
  }

}

const mapState = state => {
  return {
    user: state.user,
    currentTeacherGames: state.currentTeacherGames,
    isLoggedIn: !!state.user.id
  }
}


const mapDispatch = {
  setGameOnStateThunk,
  buildNewGameRoomThunk,
  getCurrentTeacherGames,
}

export default connect(mapState, mapDispatch)(TeacherDashboard)
