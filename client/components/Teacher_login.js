import React, { Component } from 'react';
import { Login, Signup } from '../components';
import {Button} from 'semantic-ui-react'
import history from '../history'
import { Link } from 'react-router-dom'

export default class TeacherLogin extends Component {

  handleClick(e) {
    e.target.value === "login" ? history.push('/login')
      :
        history.push('/signup')
  }

render() {
  return (
    <div id="teacher-buttons">
      <Button color="purple" value ="login" onClick={this.handleClick}> Log In </Button>
      <Button color="orange" onClick={this.handleClick}> Sign Up </Button>
        <div>
          <Link to="/home"> <Button color="black">Back</Button> </Link>
        </div>
    </div>
    )
  }

}
