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

    this.props.setGameOnStateThunk(gameId);
    this.props.listenForNewStudents(gameId);
    // this.props.getSingleStudentOnce()
  }

  componentWillUnmount(){
    const gameId = Number(this.props.currentStudents.currentGame)
    this.props.stopListeningForNewStudents(gameId);
  }



  render() {

    const currentStudents = this.props.currentStudents

    if(this.props.currentStudents.length) {
      return (
        <div>
          <h2>Leaderboard</h2>
          <Table basic='very' celled collapsing id="leaderboard-display">
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
                                  <Image src='/assets/images/avatar/small/lena.png' rounded size='mini' />
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
        <h2>nope</h2>
      )
    }

  }
}

const mapState = state => {
  return { student: state.student, currentGame: state.currentGame, currentStudents: state.currentStudents, gameState: state.gameState }
}

const mapDispatch = { getSingleStudentOnce, setGameOnStateThunk, listenForNewStudents, stopListeningForNewStudents, updateGameState }

export default connect(mapState, mapDispatch)(Leaderboard)
