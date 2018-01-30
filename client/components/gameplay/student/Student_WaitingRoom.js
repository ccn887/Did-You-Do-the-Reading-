import React, { Component } from 'react'
import { connect } from 'react-redux'
import history from '../../../history'
import { Table, Container, Button } from 'semantic-ui-react'
import { setGameOnStateThunk, stopListeningForNewStudents, listenForNewStudents, listenForGameStateChange, stopListeningForGameState } from '../../../store'


export class StudentWaitingRoom extends Component {
  constructor() {
    super()
  }

  componentDidMount() {
    const gameId = this.props.match.params.pin

    this.props.setGameOnStateThunk(gameId)
    this.props.listenForNewStudents(gameId);
    this.props.listenForGameStateChange(gameId);
  }

  componentWillReceiveProps(nextProps){
    const gameId = this.props.match.params.pin
    const userId = this.props.match.params.studentId

    const currentGame = this.props.currentGame
    const questionsArr = Object.keys(currentGame)
    const firstQuestionId = questionsArr[0]

    if (nextProps.gameState === 'askingQuestion'){
      history.push(`/${gameId}/question/${firstQuestionId}/${userId}`)
    }
  }

  componentWillUnmount () {
    const gameId = this.props.match.params.pin
    this.props.stopListeningForNewStudents(gameId);
    this.props.stopListeningForGameState(gameId);
  }

  render() {
    console.log('current students.....',this.props.currentStudents )
    const userNameArray = this.props.currentStudents.map(studentObj => {
      return studentObj.name
    })


    return (
      <div>
        <Container className="game-join-box">
        <h1>Waiting for the Game to Start!</h1>
        <Table className="contestant-table">
          <th  className="table-header">
            contestants:
          </th>
          <Table.Body>
          {
            userNameArray.length && userNameArray.map((userName, idx) => {
            return (
              <Table.Row key={`${userName}+${idx}`}>
                <Table.Cell>{userName}</Table.Cell>
              </Table.Row>
              )
            })
          }
          </Table.Body>
        </Table>
      </Container>
      </div>
    )
  }
}

const mapState = state => {
  return {
    currentGame: state.currentGame,
    currentStudents: state.currentStudents,
    gameState: state.gameState
  }
}
const mapDispatch = { setGameOnStateThunk, stopListeningForNewStudents, listenForNewStudents, listenForGameStateChange, stopListeningForGameState}


export default connect(mapState, mapDispatch)(StudentWaitingRoom)
