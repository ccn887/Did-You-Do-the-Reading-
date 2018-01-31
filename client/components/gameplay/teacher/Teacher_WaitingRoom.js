import React, { Component } from 'react'
import { Table, Container, Button } from 'semantic-ui-react'
import { connect } from 'react-redux'
import history from '../../../history'
import {
  getSingleStudentOnce,
  setGameOnStateThunk,
  listenForNewStudents,
  stopListeningForNewStudents,
  updateGameState
} from '../../../store'
import Leaderboard from '../../Leaderboard'


export class TeacherWaitingRoom extends Component {
  constructor() {
    super();
    this.playGame = this.playGame.bind(this)
  }

  componentDidMount() {
    const gameId = this.props.match.params.pin
    this.props.setGameOnStateThunk(gameId);
    this.props.listenForNewStudents(gameId);
  }

  componentWillUnmount() {
    const gameId = this.props.match.params.pin;
    this.props.stopListeningForNewStudents(gameId);
  }

  playGame(e) {
    e.preventDefault();
    const currentGame = this.props.currentGame
    const gameRoomId = this.props.match.params.pin;
    const questionsArr = Object.keys(currentGame)
    const firstQuestionId = questionsArr[0]

    this.props.updateGameState(gameRoomId, 'askingQuestion')
    history.push(`/teacher/${gameRoomId}/question/${firstQuestionId}`)
  }


  render() {

    const currentStudents = this.props.currentStudents
    const gamePin = this.props.match.params.pin

    return (
      <div>
        <Container className="game-join-box">
          <h1>Enter the Pin to Join the Game!</h1>
          <div id="game-pin-box">
            <h1 id="game-pin">{gamePin}</h1>
          </div>
          {currentStudents.length ?
            <div>
            <Table className="contestant-table">
              <th className="table-header">
                contestants:
              </th>
                <Table.Body>
                  {
                    (currentStudents.map(user => {
                      return (
                        <Table.Row key={user}>
                          <Table.Cell >
                            {user.name}
                          </Table.Cell>
                        </Table.Row>
                      )
                    }))
                  }
                </Table.Body>
              </Table>
            </div>
          : (
            <div id="waiting-for-contestants">Waiting for contestants...</div>
          )
            }
          <Button className="ui button purple" onClick={this.playGame}>Start the Quiz!</Button>
        </Container>
      </div>
    )
  }
}

const mapState = state => {
  return { student: state.student, currentGame: state.currentGame, currentStudents: state.currentStudents, gameState: state.gameState }
}

const mapDispatch = { getSingleStudentOnce, setGameOnStateThunk, listenForNewStudents, stopListeningForNewStudents, updateGameState }

export default connect(mapState, mapDispatch)(TeacherWaitingRoom)
