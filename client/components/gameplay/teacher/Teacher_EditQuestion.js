import firebase from '../../../../server/firebase'
import React, { Component } from 'react'
import { Form, Input, Button, Container, Message } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { me } from '../../../store';
import { editQuestionToSetThunk } from '../../../store'

export class TeacherEditQuestion extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
    this.editQuestion = this.editQuestion.bind(this)
  }

  editQuestion(e) {

    e.preventDefault()
    const newQuestionObj = {
      question: e.target.question.value,
      rightAnswer: e.target.solution.value,
      answers: [e.target.solution.value, e.target.wrongOne.value, e.target.wrongTwo.value, e.target.wrongThree.value]
    }
    let questionSetId = this.props.questionSetId
    let questionId = this.props.questionId
    this.props.editQuestionToSetThunk(questionSetId, questionId, newQuestionObj)
    this.props.closeEditWindow();
  }

  render() {
    let rightAnswer = this.props.questionObj.rightAnswer
    let wrongAnswers = this.props.questionObj.answers.filter(item => {
      return item !== rightAnswer
    })
    
    return (
      <Container>
        <Message className="Edit-new-question">
          <Form onSubmit={this.editQuestion}>
            <div className="right-answer-flex">
              <label> Question
                      <Input defaultValue={this.props.questionObj.question} required type="text" name="question" />
              </label>
              <label> Solution
                      <Input defaultValue={rightAnswer} required type="text" name="solution" />
              </label>
            </div>
            <div className="right-answer-flex">
              <label> Wrong Answer 1
                      <Input defaultValue={wrongAnswers[0]} required type="text" name="wrongOne" />
              </label>
              <label> Wrong Answer 2
                      <Input defaultValue={wrongAnswers[1]} required type="text" name="wrongTwo" />
              </label>
              <label> Wrong Answer 3
                      <Input defaultValue={wrongAnswers[2]} required type="text" name="wrongThree" />
              </label>
            </div>
            <Button type="Submit" value="submit"> Update Question </Button>
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
