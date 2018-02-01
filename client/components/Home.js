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
      <div className="userSelectMenu">
        <div className="studentButton">
            <img id="student_icon" src="/images/student_icon.png" />
          <Button color="orange" inverted value="student" onClick={this.navigate}>I'm a Student!</Button>
        </div>
        <div className="studentButton">
            <img id="teacher_icon" src="/images/teacher_icon.png" />
          <Button color="purple" inverted value="teacher" onClick={this.navigate}>I'm a Teacher!</Button>
        </div>
      </div>
    )
  }
}
