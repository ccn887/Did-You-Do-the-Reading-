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
      showEditForm: false,

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

  deleteQuestion = (e, id) => {
    e.preventDefault()
    this.props.deleteQuestionFromSetThunk(this.props.match.params.questionSetId, id)
  }

  editQuestion = (e, id) => {
    e.preventDefault()
    const newQuestionObj = {
      question: e.target.question.value,
      rightAnswer: e.target.solution.value,
      answers: [e.target.solution.value, e.target.wrongOne.value, e.target.wrongTwo.value, e.target.wrongThree.value]
    }
    this.props.editQuestionToSetThunk(this.props.match.params.questionSetId, id, newQuestionObj)
  }

  saveQuiz = (e) => {
    const pin = Math.floor(Math.random() * 90000) + 10000;
    const title = this.state.quizTitle;
    console.log('title:', title)
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

  showEditForm = () => {
    this.setState({
      showEditForm: true
    })
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

  render() {

    let quizArr = [];
    const questionSet = this.props.questionSet
    if (questionSet) {
      quizArr = Object.keys(questionSet)
    }

    const showAddForm = this.state.showAddForm;
    const showEditForm = this.state.showEditForm;
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
                  questionSet && quizArr.length && quizArr.map((question) => {
                    return (
                      <div key={question}>
                        <Message className='question-edit-box' color='teal'>
                          <div className='question-edit-flex'>
                            <h3 >{questionSet[question].question} </h3>
                            {console.log("QWESTION",question)}
                            <Button onClick={(e) => { this.deleteQuestion(e, question) }}>
                              <Icon name="trash"></Icon>
                            </Button>
                
                            <Button onClick={(e) => {this.showEditForm(e, question)}}> <Icon name="edit"> </Icon>
                            </Button>
                            {showEditForm && <TeacherEditQuestion question={question} />}
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
                            })
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
  buildNewGameRoomThunk,
  editQuestionToSetThunk,
}

export default connect(mapState, mapDispatch)(AllQuestions)
