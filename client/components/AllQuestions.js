import firebase from '../../server/firebase'
import React, { Component } from 'react'
import axios from 'axios'
import { Form, TextArea, Button} from 'semantic-ui-react'
// import { currentId } from 'async_hooks';


export default class AllQuestions extends Component {
  constructor() {
    super()
    // this.saveQuiz = this.saveQuiz.bind(this)
    // this.deleteQuestion = this.deleteQuestion.bind(this)
    this.getQuiz = this.getQuiz.bind(this)


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
async getQuiz(){
  let currentQuiz
  try{
  const questionSetId = this.props.match.params.questionSetId
  const questionSetRef = await firebase.database().ref(`questionSets/${questionSetId}`)
  .on('value', async (snapshot) => {
    try{
    currentQuiz  = await snapshot.val()
    console.log('currentQuiz', currentQuiz)
    return currentQuiz
    }
    catch(err){
      console.log(err)
    }
  })
  const answer = questionSetRef
  console.log('questionsetref', answer)
}
catch(err){
  console.log(err)
}

}
  render() {
    return (
      <div>
        <h1>Edit Your Current Quiz Below</h1>
        <button onClick={this.getQuiz}> Click Me!</button>
      </div>
    )
  }
}

