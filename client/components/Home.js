import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'
import history from '../history'
import axios from 'axios'

export default class Home extends Component {


    constructor() {
    super();
    this.state = {
      buffer: {},
      context: {}
    }
  }

  /*
  componentDidMount (){
    let context = new AudioContext();
    axios.get('audio/click.mp3')
      .then(res => {
        console.log('CONTEXT', res.data)
        context.decodeAudioData(res.data, (buffer) => {
          this.setState({ buffer })
          .bind(this)
        })
      })
      .catch(err => console.error(err));
    }

  playSound(buffer) {
    var source = context.createBufferSource();  // creates a sound source
    source.buffer = buffer;                     // tell the source which sound to play
    source.connect(context.destination);       // connect the source to the context's destination (the speakers)
    source.start(0);
  }
  */

  navigate(e){
    e.preventDefault();
    e.target.value === 'student' ? history.push('/student/login') : history.push('/teacherlogin')
  }

  pushJoin(){
    history.push('/student/login')
  }

  render(){

    return (
      <div className="userSelectMenu">
        <div className="studentButton">
            <img onClick={this.pushJoin} id="student_icon" src="/images/student_icon.png" />
          <Button color="orange" value="student" onClick={this.navigate}>I'm a Student!</Button>
        </div>
        <div className="studentButton">
            <img id="teacher_icon" value="teacher"  src="/images/teacher_icon.png" onClick={this.navigate} />
          <Button color="purple" value="teacher" onClick={this.navigate}>I'm a Teacher!</Button>
        </div>
      </div>
    )
  }
}
