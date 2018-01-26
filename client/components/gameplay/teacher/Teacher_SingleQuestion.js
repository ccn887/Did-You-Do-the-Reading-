import firebase from '../../../../server/firebase'
import React, { Component } from 'react'
import { Card } from 'semantic-ui-react'
import { shuffle } from '../../../utils'
import { history } from '../../../history'
import { Redirect } from 'react-router-dom'
import { setGameOnStateThunk } from '../../../store'
import { connect } from 'react-redux'



export class TeacherSingleQuestion extends Component {
  constructor() {
    super();
    this.state = {
      currentQuestion: {},
      timer: null,
      counter: 20,
      shuffledArray: [],
      nextQuestionId: null
    }
    this.tick = this.tick.bind(this);
    // this.timesUp = this.timesUp.bind(this);

  }

componentDidMount() {

    const gameRoomId = this.props.match.params.pin;
    const questionId = this.props.match.params.questionId;
    const nextQuestionId = +this.props.match.params.questionId + 1
    this.props.setGameOnStateThunk(gameRoomId)
    const currentGame = this.props.currentGame
    console.log('currentGameObj', this.props.currentGame)

    let timer = setInterval(this.tick, 1000);
    this.setState({ timer, nextQuestionId });

  }

// componentWillUnmount() {
//   this.setState({timer: null, counter: 20, nextQuestionId: null})

// }

tick(){
  if (this.state.counter === 0) {
    this.setState({ counter: 20 })
  } else {
    this.setState({ counter: this.state.counter - 1 });
  }
}

shuffleToState(arr){
  const questionId = this.props.match.params.questionId;

}

render() {
  const gameRoomId = this.props.match.params.pin;
  const questionId = this.props.match.params.questionId;
  const nextQuestionId = this.state.nextQuestionId
  const timer = this.state.counter;
  const currentQuestion = this.props.currentGame[questionId]
    console.log('currentq', currentQuestion)
    const indexArray = currentQuestion && Object.keys(currentQuestion.answers);
    const answerArray = indexArray && indexArray.map(index => {
      return currentQuestion.answers[index]
    });



  return (
    <div>
      {
        timer === 0
          ? <Redirect to={`/teacher/${gameRoomId}/question/${nextQuestionId}`} />
          :
          (
            <div>
              <div>
                <Card>
                  <h1 id="teacher-single-question">{currentQuestion && currentQuestion.question}</h1>
                </Card>
                <Card.Group itemsPerRow={2}>
                  <Card className="teacher-single-answer">{answerArray.length && answerArray[0]}</Card>
                  <Card className="teacher-single-answer">{answerArray.length && answerArray[1]}</Card>
                  <Card className="teacher-single-answer">{answerArray.length && answerArray[2]}</Card>
                  <Card className="teacher-single-answer">{answerArray.length && answerArray[3]}</Card>
                </Card.Group>
              </div>
              <div>
                <div>Time Remaining: {this.state.counter}</div>
              </div>
            </div>
          )
      }
    </div>
  )
}


}

const mapState = state => {
  return {
    currentGame: state.currentGame
  }
}
const mapDispatch = { setGameOnStateThunk }

export default connect(mapState, mapDispatch)(TeacherSingleQuestion)
