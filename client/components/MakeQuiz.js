import firebase from '../../server/firebase'
import React, { Component } from 'react'
import axios from 'axios'
import { Form, TextArea, Button, Container } from 'semantic-ui-react'
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
      const res = await axios.post('/api/text/vocab', wordsToSearch)
      const questionArr = res.data
      const questionSetRef = firebase.database().ref('questionSets');
      let newQuestionSetRef = questionSetRef.push({})
      questionArr.forEach(questionObj => {
        firebase.database().ref(`questionSets/${newQuestionSetRef.key}`)
        .push(questionObj)
      })
      history.push(`/${newQuestionSetRef.key}/all-questions`)
    }
    catch (err) {
      console.log(err)
    }
  }

  render() {
    return (
      <div>
        <Container>
          <h3>enter text to generate quiz questions</h3>
          <Form.TextArea id="enter-text" onChange={this.handleChange}  />
          <Button type="submit" onClick={this.submit}> Generate Quiz </Button>
        </Container>
      </div>
    )
  }

}
