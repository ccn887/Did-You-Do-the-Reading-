import firebase from '../../../../server/firebase'
import React, { Component } from 'react'
import { Table, Container, Button } from 'semantic-ui-react'
import { connect } from 'react-redux'
import history from '../../../history'
import { setGameOnStateThunk, listenForNewStudents, stopListeningForNewStudents, updateGameState } from '../../../store'

export class TeacherWaitingRoom extends Component {
  constructor() {
    super();
    this.playGame = this.playGame.bind(this)

  }
  componentDidMount() {
    const gameId = this.props.match.params.pin

    this.props.setGameOnStateThunk(gameId)
    this.props.listenForNewStudents(gameId);
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
  render() {

    const gamePin = this.props.match.params.pin
    let users;
    if (this.props.currentStudents){
      users = Object.keys(this.props.currentStudents)
    } else {
      users = [];
    }

    // gets users names
    let currentUsers;
    firebase.database().ref(`/gameRooms/${gamePin}/users`)
    .on('value', snapshot => {
      currentUsers = Object.values(snapshot.val())
    })

    // puts users scores into array
    // let usersArray = []
    // users.map(user => {
    //   firebase.database().ref(`users/${user}`)
    //     .once('value', snapshot => {
    //       usersArray.push(snapshot.val())
    //     })
    // })

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
              (currentUsers.map(user => {
              return (
                <Table.Row key={user}>
                  <Table.Cell >
                    {user}
                  </Table.Cell>
                </Table.Row>
              )
              }))
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
  return { currentGame: state.currentGame, currentStudents: state.currentStudents, gameState: state.gameState }
}

const mapDispatch = { setGameOnStateThunk, listenForNewStudents, stopListeningForNewStudents, updateGameState}

export default connect(mapState, mapDispatch)(TeacherWaitingRoom)
