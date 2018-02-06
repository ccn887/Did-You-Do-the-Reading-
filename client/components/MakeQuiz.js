import React, { Component } from 'react'
import { Form, TextArea, Button, Container } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { generateQuestionSetThunk } from '../store'
import Navbar from './Navbar'
import { Dimmer, Loader, Image, Segment } from 'semantic-ui-react'


export class MakeQuiz extends Component {
  constructor() {
    super()
    this.state = {
      text: '',
      loader: 'false'
    }
    this.submit = this.submit.bind(this)
    this.handleChange = this.handleChange.bind(this)
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
    this.setState({
      loader: 'true'
    })
  }

  render() {
    const active = this.state.active
    const active2 = this.state.active2


    return (
      <div>
        <Navbar />
        <div id="make-quiz-wrapper">
          {  this.state.loader === 'false' ?
            <div>
            <h2>Enter text to generate new quiz questions</h2>
            <Form.TextArea id="enter-text" onChange={this.handleChange}  />
            <Button toggle active={active} onClick={this.handleClick1}> Include Vocabulary Questions </Button>
            <Button toggle active={active2} onClick={this.handleClick2}> Include Quote Attribution Questions </Button>
            <Button type="submit" onClick={this.submit}> Generate Quiz </Button>
          </div>
          :
          <Dimmer active>
            <Loader indeterminate>Preparing Your Questions!</Loader>
          </Dimmer>
          }
      </div>
    </div>
    )
  }
}


const mapDispatch = { generateQuestionSetThunk }

export default connect(null, mapDispatch)(MakeQuiz);
