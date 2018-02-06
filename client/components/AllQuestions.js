import React, { Component } from 'react'
import { Button, Message, Icon, Container, Form } from 'semantic-ui-react'
import { me, fetchQuestionSetThunk, deleteQuestionFromSetThunk, stopFetchingQuestionSetsThunk, buildNewGameRoomThunk, editQuestionToSetThunk } from '../store';
import { connect } from 'react-redux'
import history from '../history'
import TeacherAddQuestion from '../components/gameplay/teacher/Teacher_AddQuestion'
import TeacherEditQuestion from '../components/gameplay/teacher/Teacher_EditQuestion'


export class AllQuestions extends Component {
  constructor() {
    super()
    this.state = {
      showAddForm: false,
      noQuestions: true,
      quizTitle: 'Untitled Game',
      showEditForm: NaN,

    }
  }

  componentDidMount() {
    this.props.fetchQuestionSetThunk(this.props.match.params.questionSetId)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.questionSet) {
      this.setState({ noQuestions: false })
    }
  }

  componentWillUnmount() {
    this.props.stopFetchingQuestionSetsThunk(this.props.match.params.questionSetId)
  }

  componentDidUpdate() {
    // window.scrollTo(0,0);
  }

  deleteQuestion = (e, id) => {
    e.preventDefault()
    this.props.deleteQuestionFromSetThunk(this.props.match.params.questionSetId, id)
  }



  saveQuiz = (e) => {
    const pin = Math.floor(Math.random() * 90000) + 10000;
    const title = this.state.quizTitle;
    e.preventDefault();
    this.props.buildNewGameRoomThunk(this.props.questionSet, this.props.user.id, pin, title)
    history.push(`/teacher-waiting-room/${pin}`)
  }

  // updateQuestion = (e, id) => {
  //   e.preventDefault()
  //   this.
  // }
  showAddForm = () => {
    this.setState({
      showAddForm: true
    })
  }

  showEditForm = (evt) => {
    evt.preventDefault();
    console.log(typeof evt.target.value)
    this.setState({showEditForm: +evt.target.value})
  }

  handleChange = (e) => {
    e.preventDefault()
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  goBack = (e) => {
    e.preventDefault()
    history.push(`/make-quiz`)
  }

  setEditingToNaN = () => {
    console.log("THIS FROM CRAZY FUNCTION: ", this)
    this.setState({showEditForm: NaN})
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
              <div>
                <h3> that text passage generated no questions</h3>
                <Button color="teal" onClick={this.goBack}>Generate Quiz With New Text</Button>
              </div>
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
                    questionSet && quizArr.length && quizArr.map((question, idx) => {
                      return (
                        <div key={question}>
                          <Message className='question-edit-box' color='teal'>
                            <div className='question-edit-flex'>
                              <h3 >{questionSet[question].question} </h3>
                                <Button value={idx} onClick={this.showEditForm} >
                                  edit
                                </Button>
                              <Button onClick={(e) => { this.deleteQuestion(e, question) }}>
                                <Icon name="trash"></Icon>
                              </Button>

                            </div>
                            <div>
                              {
                                questionSet[question].answers.map(answer => {
                                  if (answer === questionSet[question].rightAnswer) {
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
                                })
                              }
                              {this.state.showEditForm === idx &&
                                <TeacherEditQuestion
                                  questionId={question}
                                  questionObj={questionSet[question]}
                                  questionSetId={this.props.match.params.questionSetId}
                                  showEditState={this.state.showEditForm}
                                  closeEditWindow={this.setEditingToNaN}/>}
                            </div>
                          </Message>

                        </div>
                      )
                    })
                  }
                  <div className="two-button-flex">
                    <Button color="orange" onClick={this.showAddForm}>Add Another Question</Button>
                    <Button color="purple" onClick={this.saveQuiz}>Generate Quiz</Button>
                    <Button color="red" onClick={this.showEditForm}>Edit Questions</Button>
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
  buildNewGameRoomThunk,
  editQuestionToSetThunk,
}

export default connect(mapState, mapDispatch)(AllQuestions)
