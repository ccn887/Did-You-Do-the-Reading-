import React, { Component } from 'react'
import { Form, Input, Button } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { addStudentToGameThunk } from '../../../store'
import firebase from '../../../../server/firebase'
import history from '../../../history'


export class StudentJoinGame extends Component {
  constructor() {
    super()
    this.state = {
      currentGame: '',
      name: '',
      pin: '',
      activeUser: true
    }
  }

  componentWillReceiveProps (nextProps) {
    if (!nextProps.firebaseUser.uid){
      this.setState({activeUser: false})
    }
  }

  handleChange = (e) => {
    e.preventDefault()
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  join = (e) => {
    e.preventDefault();
    const currentGame = this.state.pin
    const name = this.state.name
    const uid = this.props.firebaseUser.uid
    console.log("user joining game: ", name, uid)
    this.props.addStudentToGameThunk(name, currentGame, uid);
  }

  logout = (evt) => {
    evt.preventDefault();
    firebase.auth().signOut();
    history.push(`/student/login`)
  }

  goToLogin = (evt) => {
    evt.preventDefault();
    history.push(`/student/login`)
  }


  render() {
    console.log('Firebase User from FB: ', firebase.auth().currentUser)
    console.log('firebase user from store', this.props.firebaseUser)
    return (
      <div id="join-game-container">
        {
          this.state.activeUser
          ?
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
            <div id="join-logout-button-wrapper">
              <Button id="join-logout-button" inverted color="orange" onClick={this.logout}>Log Out</Button>
            </div>
          </Form>
          :
          <div>
            <h2>You must log in to join a game!</h2>
            <Button onClick={this.goToLogin}>Go To Login</Button>
          </div>
        }
      </div>
    )
  }

}

const mapState = state => {
  return {
    currentGame: state.currentGame,
    firebaseUser: state.firebaseUser
  }
}

const mapDispatch = { addStudentToGameThunk }

export default connect(mapState, mapDispatch)(StudentJoinGame)
