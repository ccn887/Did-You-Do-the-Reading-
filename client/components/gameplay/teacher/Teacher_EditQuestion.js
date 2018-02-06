import firebase from '../../../../server/firebase'
import React, { Component } from 'react'
import { Form, Input, Button, Container, Message } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { me } from '../../../store';
import { editQuestionToSetThunk } from '../../../store'

export class TeacherEditQuestion extends Component {
  constructor() {
    super()
    // this.state = {
    // }
    // this.editQuestion = this.editQuestion.bind(this)

  }

  editQuestion(e) {
    e.preventDefault()
    const newQuestionObj = {
      question: e.target.question.value,
      rightAnswer: e.target.solution.value,
      answers: [e.target.solution.value, e.target.wrongOne.value, e.target.wrongTwo.value, e.target.wrongThree.value]
    }
    // this.props.editQuestionToSetThunk()
  }

  render() {       
      console.log("PROPS ON FORM", this.props)
console.log("qu3estion", this.props.question)
    return (
      <Container>
        <Message className="Edit-new-question">
          <Form onSubmit={this.editQuestion}>
            <div className="right-answer-flex">
              <label> Question
                      <Input required type="text" name="question" />
              </label>
              <label> Solution
                      <Input required type="text" name="solution" />
              </label>
            </div>
            <div className="right-answer-flex">
              <label> Wrong Answer 1
                      <Input required type="text" name="wrongOne" />
              </label>
              <label> Wrong Answer 2
                      <Input required type="text" name="wrongTwo" />
              </label>
              <label> Wrong Answer 3
                      <Input required type="text" name="wrongThree" />
              </label>
            </div>
            <Button type="Submit" value="submit"> Edit Question </Button>
          </Form>
        </Message>
      </Container>
    )
  }
}

const mapState = state => {
  return { user: state.user }
}

const mapDispatch = { editQuestionToSetThunk }

export default connect(mapState, mapDispatch)(TeacherEditQuestion)

// const mapState = state => {
//   return { currentGame: state.currentGame }
// }


// export default connect(mapState)(StudentWaitingRoom)
