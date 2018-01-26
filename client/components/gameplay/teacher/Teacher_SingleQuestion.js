import firebase from '../../../../server/firebase'
import React, { Component } from 'react'
import { Form, Card, Button } from 'semantic-ui-react'


export default class TeacherSingleQuestion extends Component {
  constructor(){
    super();
    this.state = {
      currentQuestion : {},
      timer: null,
      counter: 120
    }
    this.tick = this.tick.bind(this);
  }

  componentDidMount(){
    //pull question object from firebase
    //shuffle answer order
    //start a timer
    let timer = setInterval(this.tick, 1000);
    this.setState({timer});
  }

  componentWillUnmount() {
    this.clearInterval(this.state.timer);
  }


  tick(){
    this.setState({counter: this.state.counter - 1});
  }


  render() {

    return (
      <div>
        <div>
          <Card>
            <h1 id="teacher-single-question">This will be a question? </h1>
          </Card>
          <Card.Group>
           <Card id="teacher-single-answer">Answer</Card>
           <Card id="teacher-single-answer">AnotherAnswer</Card>
           <Card id="teacher-single-answer">Nope not this</Card>
           <Card id="teacher-single-answer">yes this one!</Card>
           </Card.Group>
        </div>
        <div>
          <div>Time Remaining: {this.state.counter}</div>
        </div>
      </div>
    )
  }


}
