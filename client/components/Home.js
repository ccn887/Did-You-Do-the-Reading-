import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'
import history from '../history'


export default class Home extends Component {
  constructor(){
    super()
  }

navigate(e){
  e.preventDefault();
  e.target.value === 'student' ? history.push('/join') : history.push('/login')
}

render(){
  return (
    <div>
      <Button color="orange" value="student" onClick={this.navigate}>I'm a Student!</Button>
      <Button color="purple" value="teacher" onClick={this.navigate}>I'm a Teacher!</Button>
    </div>
  )
}
}
