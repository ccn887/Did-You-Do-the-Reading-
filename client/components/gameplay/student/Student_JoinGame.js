import firebase from '../../../../server/firebase'
import React, { Component } from 'react'
import { Form, Input, Button } from 'semantic-ui-react'
import { connect } from 'react-redux'
import history from '../../../history'
import { setCurrentStudent } from '../../../store'


export class StudentJoinGame extends Component {
  constructor() {
    super()
    this.state = {
      currentGame: '',
      name: '',
      pin: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.join = this.join.bind(this)

  }
  handleChange(e) {
    e.preventDefault()
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  join(e) {
    e.preventDefault();
    const currentGame = this.state.pin
    const name = this.state.name
    const usersRef = firebase.database().ref('users')
      .push({
        name: this.state.name,
        score: 0,
        streak: 0,
        currentGame: currentGame
      })
    const gameRoomRef = firebase.database().ref(`gameRooms/${currentGame}/users`)
      .child(name).push(true)
      this.props.setCurrentStudent(usersRef.key)
      const studentId = usersRef.key
    history.push(`/student-waiting-room/${currentGame}/${studentId}`)
  }
  render() {
    return (
      <div>
        <Form>
          <Form.Field>
            <label>Pin!</label>
            <input name="pin" onChange={this.handleChange} />
          </Form.Field>
          <Form.Field>
            <label>Name:</label>
            <input name="name" onChange={this.handleChange} />
          </Form.Field>
        </Form>
        <button onClick={this.join}>Join the Game!</button>
      </div>
    )
  }
}

const mapState = state => {
  return { currentGame: state.currentGame }
}

const mapDispatch = {setCurrentStudent}

export default connect(mapState, mapDispatch)(StudentJoinGame)
