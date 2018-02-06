import React, { Component } from 'react';
import { Login, Signup } from '../components';
import {Button} from 'semantic-ui-react'
import history from '../history'
import { Link } from 'react-router-dom'

export default class TeacherLogin extends Component {

  handleClick(e) {
    switch (e.target.value) {
      case "login" :
        history.push('/login')
        break;
      case "signup" :
        history.push('/signup')
        break;
      case "back" :
        history.push('/')
        break;
    }
  }

render() {
  return (
    <div id="teacher-login-zone">
      <div id="teacher-buttons">
        <h2>Teachers Only</h2>
        <label className="white-text">Already a teacher?</label>
        <Button
          className="teacherbuttonselect"
          color="purple"
          value ="login"
          onClick={this.handleClick}> Log In </Button>
        <label className="white-text">Looking to join?</label>
        <Button
          className="teacherbuttonselect"
          color="orange"
          value="signup"
          onClick={this.handleClick}> Sign Up! </Button>
        <Button
          className="teacherbuttonselect"
          color="black"
          value="back"
          onClick={this.handleClick}>Back</Button>
      </div>
    </div>
    )
  }

}
