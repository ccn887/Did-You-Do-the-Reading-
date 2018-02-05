import React, { Component } from 'react'
import { Form, TextArea, Button, Container } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { generateQuestionSetThunk } from '../store'
import Navbar from './Navbar'


export class MakeQuiz extends Component {
  constructor() {
    super()
    this.state = {
      text: ''
    }
    this.submit = this.submit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  componentWillUnmount() {
    console.log('I AM UNMOUNTED')
  }

  handleChange(event) {
    this.setState({
      text: event.target.value
    })
  }

  handleClick1 = () => this.setState({ active: !this.state.active })
  handleClick2 = () => this.setState({ active2: !this.state.active2 })

  submit(e) {
    e.preventDefault();
    const text = this.state.text
    this.props.generateQuestionSetThunk(text);
  }

  render() {
    const active = this.state.active
    const active2 = this.state.active2
    return (
      <div>
        <Navbar />
        <Container>
          <h3>enter text to generate quiz questions</h3>
          <Form.TextArea id="enter-text" onChange={this.handleChange}  />
          <Button toggle active={active} onClick={this.handleClick1}> Include Vocabulary Questions </Button>
          <Button toggle active={active2} onClick={this.handleClick2}> Include Quote Attribution Questions </Button>
          <Button type="submit" onClick={this.submit}> Generate Quiz </Button>
        </Container>
      </div>
    )
  }
}


const mapDispatch = { generateQuestionSetThunk }

export default connect(null, mapDispatch)(MakeQuiz);
