import firebase from '../../server/firebase'
import React, { Component } from 'react'
import axios from 'axios'
import { Form, TextArea, Button} from 'semantic-ui-react'
import history from '../history'


export default class MakeQuiz extends Component {
  constructor() {
    super()
    this.state = {
      text: ''
    }
    this.submit = this.submit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }
  handleChange(event) {
    this.setState({
      text: event.target.value
    })
  }
  unique(arr) {
    let newArr = [];
    for (let i = 0; i < arr.length; i++) {
      if (!newArr.includes(arr[i])) {
        newArr.push(arr[i])
      }
    }
    return newArr;
  }
  tokenize(text) {
    let cleanText = text.toLowerCase().replace(/\W/g, ' ').replace(/\s+/g, ' ').trim().split(' ')
    return this.unique(cleanText)
  }
  async submit(e) {
    e.preventDefault();
    const text = this.state.text
    try {
      const wordsToSearch = this.tokenize(text)
      console.log('Logging: ', wordsToSearch)
      const res = await axios.post('/api/text/vocab', wordsToSearch)
      const questionSetRef = firebase.database().ref('questionSets');
      console.log('got past axios',res.data )
      let count = 0
      let newQuestionSetRef = questionSetRef.push(res.data)
      history.push(`/${newQuestionSetRef.key}/all-questions`)
      // const userId = 2
      //push questionset object to firebase
      //does the teacher have a game room?
      // const gameRoomRef = firebase.database().ref('gameRooms');
      // gameRoomRef.push({questionSets: [...newQuestionSetRef.key]})
      //push gameroom obj to firebase
      //redirect to all questions with link to gameroom lobby
    }
    catch (err) {
      console.log(err)
    }
  }

  render() {
    return (
      <div>
        <h1>Enter Your Text!</h1>
        <Form.Field onChange={this.handleChange} control={TextArea} />
        <Button type="submit" onClick={this.submit}> Generate Quiz </Button>
      </div>
    )
  }

}
