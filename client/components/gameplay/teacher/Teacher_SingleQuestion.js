import firebase from '../../../../server/firebase'
import React, { Component } from 'react'
import { Card } from 'semantic-ui-react'
import { history } from '../../../history'
import { Redirect } from 'react-router-dom'
import { setGameOnStateThunk, setCurrentQuestionThunk } from '../../../store'
import { connect } from 'react-redux'



export class TeacherSingleQuestion extends Component {
  constructor() {
    super();
    this.state = {
      timer: null,
      counter: 20,
      shuffledArray: [],
      nextQuestionId: null
    }
    this.tick = this.tick.bind(this);

  }

  componentDidMount() {

    const gameRoomId = this.props.match.params.pin;
    const questionId = this.props.match.params.questionId;
    this.props.setGameOnStateThunk(gameRoomId)
    this.props.setCurrentQuestionThunk(questionId, gameRoomId)
    const currentGame = this.props.currentGame
    let timer = setInterval(this.tick, 1000);
    this.setState({ timer });

  }

  // componentWillUnmount() {
  //   this.setState({timer: null, counter: 20, nextQuestionId: null})

  // }

  tick() {
    if (this.state.counter === 0) {
      this.setState({ counter: 20 })
    } else {
      this.setState({ counter: this.state.counter - 1 });
    }
  }

  shuffleToState(arr) {
  }

  render() {
    const gameRoomId = this.props.match.params.pin;
    const questionId = this.props.match.params.questionId;
    const timer = this.state.counter;
    const currentQuestion = this.props.currentQuestion
    const answerArray =  currentQuestion.answers ? Object.values(currentQuestion.answers) : []

    // const answerArray = indexArray.map(index => {
    //   return currentQuestion.answers[index]
    // });



    return (
      <div>
        {
          timer === 0
            ? <Redirect to={`/teacher/${gameRoomId}/answer/${questionId}`} />
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
    currentGame: state.currentGame,
    currentQuestion: state.currentQuestion
  }
}
const mapDispatch = { setGameOnStateThunk, setCurrentQuestionThunk }

export default connect(mapState, mapDispatch)(TeacherSingleQuestion)
