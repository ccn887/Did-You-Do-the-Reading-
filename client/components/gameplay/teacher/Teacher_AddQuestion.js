import firebase from '../../../../server/firebase'
import React, { Component } from 'react'
import { Form, Input, Button, Container, Message } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { me } from '../../../store';
import { addQuestionToSetThunk } from '../../../store'

export class TeacherAddQuestion extends Component {
  constructor() {
    super()
    this.state = {
    }
    this.addQuestion = this.addQuestion.bind(this)

  }

  addQuestion(e) {
    e.preventDefault()
    const newQuestionObj = {
      question: e.target.question.value,
      rightAnswer: e.target.solution.value,
      answers: [e.target.solution.value, e.target.wrongOne.value, e.target.wrongTwo.value, e.target.wrongThree.value]
    }
    this.props.addQuestionToSetThunk(this.props.match.params.questionSetId, newQuestionObj)
  }

  render() {

    return (
      <Container>
        <Message className="add-new-question">
          <Form onSubmit={this.addQuestion}>
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
            <Button type="Submit" value="submit"> Add Question </Button>
          </Form>
        </Message>
      </Container>
    )
  }
}

const mapState = state => {
  return { user: state.user }
}

const mapDispatch = { addQuestionToSetThunk }

export default connect(mapState, mapDispatch)(TeacherAddQuestion)

// const mapState = state => {
//   return { currentGame: state.currentGame }
// }


// export default connect(mapState)(StudentWaitingRoom)
