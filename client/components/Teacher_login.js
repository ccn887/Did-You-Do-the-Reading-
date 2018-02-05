import React, { Component } from 'react';
import { Login, Signup } from '../components';
import {Button} from 'semantic-ui-react'
import history from '../history'

export default class TeacherLogin extends Component {

  handleClick(e) {
    e.target.value === "login" ? history.push('/login')
      :
        history.push('/signup')
  }

render() {
  return (
    <div>
      <Button value ="login" onClick={this.handleClick}> Log In </Button>
      <Button onClick={this.handleClick}> Sign Up </Button>
    </div>
    )
  }

}
