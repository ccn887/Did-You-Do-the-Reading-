import React, { Component } from 'react'
import { Table, Container, Button, Header, Image } from 'semantic-ui-react'
import { connect } from 'react-redux'
import history from '../history'
import {
  getSingleStudentOnce,
  setGameOnStateThunk,
  listenForNewStudents,
  stopListeningForNewStudents,
  updateGameState
} from '../store'


export class Leaderboard extends Component {
  constructor() {
    super();
  }

  componentDidMount() {
    const gameId = Number(this.props.currentStudents.currentGame)
    this.props.listenForNewStudents(gameId);

  }

  componentWillUnmount(){
    const gameId = Number(this.props.currentStudents.currentGame)
    this.props.stopListeningForNewStudents(gameId);
  }

  getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }


  render() {

    let characterArray = [
      '/images/characters/char1.png',
      '/images/characters/char2.png',
      '/images/characters/char3.png',
      '/images/characters/char4.png',
      '/images/characters/char5.png',
      '/images/characters/char6.png',
      '/images/characters/char7.png'
    ]

    const currentStudents = this.props.currentStudents

    if(this.props.currentStudents.length) {
      return (
        <div id="leaderboard-wrapper">
          <h2>Leaderboard</h2>
          <Table basic="very" celled collapsing id="leaderboard-display">
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Contestant</Table.HeaderCell>
                <Table.HeaderCell>Score</Table.HeaderCell>
                <Table.HeaderCell>Streak</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
              {
                (currentStudents.map(user => {
                  return (
                          <Table.Body>
                            <Table.Row>
                              <Table.Cell>
                                <Header as='h4' image>
                                  <Image src={characterArray[this.getRandomInt(7)]} rounded size='mini' />
                                  <Header.Content id="leaderboard-username">
                                      {user.name}
                                  </Header.Content>
                                </Header>
                              </Table.Cell>
                              <Table.Cell id="leaderboard-score">
                                  {user.score}
                              </Table.Cell>
                              <Table.Cell id="leaderboard-streak">
                                  {user.streak}
                              </Table.Cell>
                            </Table.Row>
                          </Table.Body>
                      )
                }))
                }
              </Table>
          </div>
        )
    } else {
      return (
        <h2>No current players to display</h2>
      )
    }

  }
}

const mapState = state => {
  return { student: state.student, currentGame: state.currentGame, currentStudents: state.currentStudents, gameState: state.gameState }
}

const mapDispatch = { getSingleStudentOnce, setGameOnStateThunk, listenForNewStudents, stopListeningForNewStudents, updateGameState }

export default connect(mapState, mapDispatch)(Leaderboard)
