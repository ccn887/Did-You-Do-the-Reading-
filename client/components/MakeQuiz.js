import firebase from '../../server/firebase'
import React, { Component } from 'react'
import { Form } from 'semantic-ui-react'


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
      text: event.target.text.value
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
    return unique(cleanText)
  }
  async submit(e) {
    e.preventDefault();
    const text = this.state.text
    try {
      const wordsToSearch = tokenize(text)
      const res = await axios.post('api/vocab/text', wordsToSearch)
      console.log(res.data)
      //do something with questions -- firebase and allq component
    }
    catch (err) {
      console.log(err)
    }
  }

  render() {
    return (
      <div>
        <Form.Field control={TextArea} />
        <button onClick={this.handleMyClick}> Click Me!</button>
      </div>
    )
  }

}
