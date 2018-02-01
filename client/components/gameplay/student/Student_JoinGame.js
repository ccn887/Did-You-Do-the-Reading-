import React, { Component } from 'react'
import { Form, Input, Button } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { addStudentToGameThunk } from '../../../store'


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

    this.props.addStudentToGameThunk(name, currentGame);
  }

  render() {
    return (
      <div id="join-game-container">
        <Form className="student-join-box">
          <Form.Field>
            <label className="join-labels">Pin:</label>
            <input type="text" id="join-pin" className="join-game-input" name="pin" maxLength="5" onChange={this.handleChange} />
          </Form.Field>
          <Form.Field >
            <label className="join-labels">Name:</label>
            <input className="join-game-input" id="join-name" name="name" maxLength="20" onChange={this.handleChange} />
          </Form.Field>
        <Button color="purple" inverted id="join-game-button" onClick={this.join}>Join the Game!</Button>
        </Form>
      </div>
    )
  }

}

const mapState = state => {
  return {
    currentGame: state.currentGame
  }
}

const mapDispatch = { addStudentToGameThunk }

export default connect(mapState, mapDispatch)(StudentJoinGame)
