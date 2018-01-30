import React, { Component } from 'react'
import { Form, TextArea, Button, Container } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { generateQuestionSetThunk } from '../store'


export class MakeQuiz extends Component {
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


  submit(e) {
    e.preventDefault();
    const text = this.state.text

    this.props.generateQuestionSetThunk(text);
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


const mapDispatch = { generateQuestionSetThunk }

export default connect(null, mapDispatch)(MakeQuiz);
