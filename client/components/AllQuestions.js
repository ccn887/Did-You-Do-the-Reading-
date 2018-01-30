import React, { Component } from 'react'
import { Button, Message, Icon, Container } from 'semantic-ui-react'
import { me, fetchQuestionSetThunk, deleteQuestionFromSetThunk, stopFetchingQuestionSetsThunk, buildNewGameRoomThunk } from '../store';
import { connect } from 'react-redux'
import history from '../history'
import TeacherAddQuestion from '../components/gameplay/teacher/Teacher_AddQuestion'


export class AllQuestions extends Component {
  constructor() {
    super()
    this.state = {
      showAddForm: false,
      noQuestions: true,
      quizTitle: 'Untitled Game'
    }

    this.saveQuiz = this.saveQuiz.bind(this)
    this.deleteQuestion = this.deleteQuestion.bind(this)
    this.showAddForm = this.showAddForm.bind(this);
    this.handleChange = this.handleChange.bind(this)

  }

  deleteQuestion(e, id) {
    e.preventDefault()
    this.props.deleteQuestionFromSetThunk(this.props.match.params.questionSetId, id)
  }

  saveQuiz(e) {
    const pin = Math.floor(Math.random() * 90000) + 10000;
    const title = this.state.quizTitle;
    console.log('title:', title)
    e.preventDefault();
    this.props.buildNewGameRoomThunk(this.props.questionSet, this.props.user.id, pin, title)
    history.push(`/teacher-waiting-room/${pin}`)
  }

  componentDidMount() {
    this.props.fetchQuestionSetThunk(this.props.match.params.questionSetId)
  }

  showAddForm() {
    this.setState({
      showAddForm: true
    })
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.questionSet) {
      this.setState({ noQuestions: false })
    }
  }

  componentWillUnmount() {
    this.props.stopFetchingQuestionSetsThunk(this.props.match.params.questionSetId)
  }

  handleChange(e) {
    e.preventDefault()
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render() {

    let quizArr = [];
    const questionSet = this.props.questionSet
    if (questionSet) {
      quizArr = Object.keys(questionSet)
    }

    const showAddForm = this.state.showAddForm;

    return (
      <div>
        <Container id="all-questions-container">
          <div>
            {this.state.noQuestions ?
              <h3> that text passage generated no questions</h3>
              :
              <div>
                <h2>edit your quiz below</h2>
                <Form>
                  <Form.Field>
                    <label>Quiz Title</label>
                    <input name="quizTitle" onChange={this.handleChange} />
                  </Form.Field>
                </Form>
                <div>

                {
                  questionSet && quizArr.length && quizArr.map((question) => {
                    return (
                      <div key={question}>
                        <Message className='question-edit-box' color='teal'>
                          <div className='question-edit-flex'>
                            <h3 >{questionSet[question].question} </h3>
                            <Button onClick={(e) => { this.deleteQuestion(e, question) }}>
                              <Icon name="trash"></Icon>
                            </Button>
                          </div>
                        <div>
                        {
                          questionSet[question].answers.map(answer => {
                            if (answer === questionSet[question].rightAnswer){
                              return (
                                <div className='right-answer-flex' key={answer}>
                                  <div>{answer}</div>
                                  <Icon color="olive" name="checkmark" />
                                </div>
                              )
                            }
                            else {
                              return (
                                <div key={answer}>
                                  <div>{answer}</div>
                                </div>
                                )

                              }
                            </div>
                          </Message>
                        </div>
                      )
                    })
                  }
                  <div className="two-button-flex">
                    <Button color="orange" onClick={this.showAddForm}>Add Another Question</Button>
                    <Button color="purple" onClick={this.saveQuiz}>Generate Quiz</Button>
                  </div>
                  {showAddForm && <TeacherAddQuestion match={this.props.match} />}
                </div>
              </div>
            }
          </div>
        </Container>
      </div>
    )
  }
}


const mapState = state => {
  return {
    user: state.user,
    questionSet: state.questionSet
  }
}

const mapDispatch = {
  me,
  fetchQuestionSetThunk,
  deleteQuestionFromSetThunk,
  stopFetchingQuestionSetsThunk,
  buildNewGameRoomThunk
}

export default connect(mapState, mapDispatch)(AllQuestions)
