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
import { Link } from 'react-router-dom'
import Header  from '../../Header'


export class TeacherWaitingRoom extends Component {
  constructor() {
    super();
    this.state = {
      currentStudents: []
    }
  }

  componentDidMount() {
    const gameId = this.props.match.params.pin
    this.props.setGameOnStateThunk(gameId);
    this.props.listenForNewStudents(gameId);
  }

  componentWillReceiveProps(nextProps){
    if (nextProps.currentStudents){
      this.setState({currentStudents: nextProps.currentStudents})
    }
  }

  componentWillUnmount() {
    const gameId = this.props.match.params.pin;
    this.props.stopListeningForNewStudents(gameId);
  }

  playGame = (e) => {
    e.preventDefault();
    const currentGame = this.props.currentGame
    const gameRoomId = this.props.match.params.pin;
    const questionsArr = Object.keys(currentGame)
    const firstQuestionId = questionsArr[0]


    this.props.updateGameState(gameRoomId, 'askingQuestion')
    history.push(`/teacher/${gameRoomId}/question/${firstQuestionId}`)
  }


  render() {

    const currentStudents = this.state.currentStudents
    const gamePin = this.props.match.params.pin

    return (
      <div>
        <center>
          <Header />
        </center>
        <Container className="game-join-box">
          <h1>Enter the Pin to Join the Game!</h1>
          <div id="game-pin-box">
            <h1 id="game-pin">{gamePin}</h1>
          </div>
          {currentStudents.length ?
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
          : (
            <div id="waiting-for-contestants">Waiting for contestants...</div>
          )
            }
          <Button className="ui button purple" onClick={this.playGame}>Start the Quiz!</Button>
          <div>
            <Link to="/"> <Button id="backfrom-game-pin" color="black">Back</Button> </Link>
          </div>
        </Container>
      </div>
    )
  }
}

const mapState = state => {
  return {
    student: state.student,
    currentGame: state.currentGame,
    currentStudents: state.currentStudents,
    gameState: state.gameState
  }
}

const mapDispatch = { getSingleStudentOnce, setGameOnStateThunk, listenForNewStudents, stopListeningForNewStudents, updateGameState }

export default connect(mapState, mapDispatch)(TeacherWaitingRoom)
