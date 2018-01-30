import firebase from '../../../../server/firebase'
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


export class TeacherWaitingRoom extends Component {
  constructor() {
    super();
    this.playGame = this.playGame.bind(this)
    this.getTheScore = this.getTheScore.bind(this)
  }

  componentDidMount() {
    const gameId = this.props.match.params.pin
    this.props.setGameOnStateThunk(gameId)
    this.props.listenForNewStudents(gameId);
    this.props.getSingleStudentOnce()
  }

  componentWillUnmount(){
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

  getTheScore(userId) {
    this.props.getSingleStudentOnce(userId)
    console.log('props student:', this.props.singleStudent)
  }

  render() {

    let users;
    let currentStudents;
    if (this.props.currentStudents){
      // users = Object.keys(this.props.currentStudents)
      currentStudents = this.props.currentStudents

    } else {
      users = [];
    }

    const gamePin = this.props.match.params.pin


    // console.log(this.props.currentStudents)
let userScore
    return (
      <div>
        <Container className="game-join-box">
          <h1>Enter the Pin to Join the Game!</h1>
          <div id="game-pin-box">
            <h1 id="game-pin">{gamePin}</h1>
          </div>
          {users.length ?
            <Table id="contestant-table">
              <th id="table-header">
                contestants:
              </th>
              <Table.Body>
            {
              (users.map(user => {
              return (
                <Table.Row key={user}>
                  <Table.Cell >
                    {console.log('studdddd', this.getTheScore(user))}
                    {currentStudents[user]}
                  </Table.Cell>
                </Table.Row>
              )}))
            }
            </Table.Body>
            </Table>
          : (
            <div id="waiting-for-contestants">Waiting for contestants...</div>
          )
            }
          <Button className="ui button purple" onClick={this.playGame}>Start theQuiz!</Button>
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
