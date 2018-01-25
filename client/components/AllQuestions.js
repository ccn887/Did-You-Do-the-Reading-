import firebase from '../../server/firebase'
import React, { Component } from 'react'
import axios from 'axios'
import { Form, TextArea, Button} from 'semantic-ui-react'
// import { currentId } from 'async_hooks';


export default class AllQuestions extends Component {
  constructor() {
    super()
    this.state = {
      currentQuiz: []
    }
    // this.saveQuiz = this.saveQuiz.bind(this)
    // this.deleteQuestion = this.deleteQuestion.bind(this)
    // this.getQuiz = this.getQuiz.bind(this)


    //addQuestion, updatequestion
    //edit answer
  }
//  async deleteQuestion(e){
//    //deleteQuestionFromFB
//  }
//   async saveQuiz(e) {
//     e.preventDefault();
//     //make gameroom
//     try {
//     }
//     catch (err) {
//       console.log(err)
//     }
//   }
async componentDidMount(){
  let currentQuiz
  try{
  const questionSetId = this.props.match.params.questionSetId
  const questionSetRef = await firebase.database().ref(`questionSets/${questionSetId}`)
  .once('value', async (snapshot) => {
    try{
    currentQuiz  = await snapshot.val()
    this.setState({currentQuiz: currentQuiz})
    }
    catch(err){
      console.log(err)
    }
  })
  // const answer = questionSetRef
  // console.log('questionsetref', answer)
}
catch(err){
  console.log(err)
}

}
  render() {
const quiz = this.state.currentQuiz
console.log('QUIZ:', quiz)
return (
      <div>
        <h1>Edit Your Current Quiz Below</h1>
    {
      quiz.length && quiz.map(question => {
        return(
          <div key={question.rightAnswer}>
          <div>{question.question}</div>
          <div>{question.rightAnswer}</div>
          <div>{question.wrongAnswers[0]}</div>
          <div>{question.wrongAnswers[1]}</div>
          <div>{question.wrongAnswers[2]}</div>
          <div>hi</div>
          </div>
        )

    })}
    <button>Click here for next thing</button>
      </div>
    )
  }
}

