import firebase from '../../../../server/firebase'
import React, { Component } from 'react'
import { Card } from 'semantic-ui-react'
import { shuffle } from '../../../utils'
import { history} from '../../../history'
import { Redirect } from 'react-router-dom'



export default class TeacherSingleQuestion extends Component {
  constructor(){
    super();
    this.state = {
      currentQuestion: {},
      timer: null,
      counter: 20,
      answerArray: [],
      nextQuestionId: null
    }
    this.tick = this.tick.bind(this);
    // this.timesUp = this.timesUp.bind(this);

  }

  async componentDidMount(){

    const gameRoomId = this.props.match.params.pin;
    const questionId = this.props.match.params.questionId;
    const nextQuestionId = +this.props.match.params.questionId + 1

    try {
      await firebase.database().ref(`gameRooms/${gameRoomId}/quiz/${questionId}`)
      .once('value', snapshot => {
        const currentQuestion = snapshot.val();
        console.log('currentquestion: ', currentQuestion);
        const indexArray = Object.keys(currentQuestion.wrongAnswers);
        const rightAnswer = currentQuestion.rightAnswer;
        const answerArray = indexArray.map(index => {
          return currentQuestion.wrongAnswers[index]
        });
        answerArray.push(rightAnswer);
        const finalArray = shuffle(answerArray);

        let timer = setInterval(this.tick, 1000);
        this.setState({currentQuestion, answerArray: finalArray, timer, nextQuestionId});

      })
    } catch (err) {
      console.error('error retrieving quiz: ', err);
    }


  }

  // componentWillUnmount() {
  //   this.setState({timer: null, counter: 20, nextQuestionId: null})

  // }


  tick(){
    if(this.state.counter === 0){
      this.setState({counter: 20})
    } else {
    this.setState({counter: this.state.counter - 1});
    }
  }

  render() {
    const question = this.state.currentQuestion;
    const answerArray = this.state.answerArray;
    const gameRoomId = this.props.match.params.pin;
    const nextQuestionId = this.state.nextQuestionId
    console.log('nextq', nextQuestionId)
    const timer = this.state.counter;
    console.log('timer', timer)


    return (
      <div>
        {
          timer === 0
          ? <Redirect to={`/teacher/${gameRoomId}/question/${nextQuestionId}`}/>
          :
         (
          <div>
            <div>
              <Card>
                <h1 id="teacher-single-question">{question.question && question.question}</h1>
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
