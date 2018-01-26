import firebase from '../../../../server/firebase'
import React, { Component } from 'react'
import { Card } from 'semantic-ui-react'
import { shuffle } from '../../../utils'
import { history} from '../../../history'


export default class TeacherSingleQuestion extends Component {
  constructor(){
    super();
    this.state = {
      currentQuestion: {},
      timer: null,
      counter: 120,
      answerArray: []
    }
    this.tick = this.tick.bind(this);
  }

  async componentDidMount(){

    const gameRoomId = this.props.match.params.pin;
    const questionId = this.props.match.params.questionId;

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
        this.setState({currentQuestion, answerArray: finalArray, timer});

      })
    } catch (err) {
      console.error('error retrieving quiz: ', err);
    }


  }

  componentWillUnmount() {
    this.clearInterval(this.state.timer);
  }


  tick(){
    this.setState({counter: this.state.counter - 1});
  }


  render() {

    // console.log('from the render function: ', this.state)
    const question = this.state.currentQuestion;

    const answerArray = this.state.answerArray;

    const nextQuestionId = +this.props.match.params.questionId + 1;

    const timer = this.state.timer;


    return (
      <div>
        {
          timer === 0
          ? history.push(`/${nextQuestionId}`)
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
