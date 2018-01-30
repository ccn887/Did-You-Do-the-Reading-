import firebase from '../../server/firebase'
import React, { Component } from 'react'
import axios from 'axios'
import { Form, TextArea, Button, Message, Icon, Container } from 'semantic-ui-react'
import { me, fetchQuestionSetThunk, deleteQuestionFromSetThunk, stopFetchingQuestionSetsThunk, buildNewGameRoomThunk } from '../store';
import { connect } from 'react-redux'
import history from '../history'
import TeacherAddQuestion from '../components/gameplay/teacher/Teacher_AddQuestion'



export class AllQuestions extends Component {
  constructor() {
    super()
    this.state = {
      showAddForm: false
    }

    this.saveQuiz = this.saveQuiz.bind(this)
    this.deleteQuestion = this.deleteQuestion.bind(this)
    this.showAddForm = this.showAddForm.bind(this);
  }

  deleteQuestion(e, id) {
    e.preventDefault()
    this.props.deleteQuestionFromSetThunk(this.props.match.params.questionSetId, id)
  }

  saveQuiz(e) {
    const pin = Math.floor(Math.random() * 90000) + 10000;
    e.preventDefault();
    this.props.buildNewGameRoomThunk(this.props.questionSet, this.props.user.id, pin)
    history.push(`/teacher-waiting-room/${pin}`)
  }

  componentDidMount() {
    this.props.fetchQuestionSetThunk(this.props.match.params.questionSetId)
  }

  showAddForm(){
    this.setState({
      showAddForm: true
    })
  }

  componentWillUnmount(){
    this.props.stopFetchingQuestionSetsThunk(this.props.match.params.questionSetId)
  }

  render() {
    const questionSet = this.props.questionSet
    const quizArr = Object.keys(questionSet)

    const showAddForm = this.state.showAddForm;

    return (
      <div>
      <Container id="all-questions-container">
        <h2>edit your quiz below</h2>
        {
          quizArr.length ?
            (questionSet && quizArr.map((question) => {

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
                      {questionSet[question].answers.map(answer => {
                        if(answer === questionSet[question].rightAnswer){
                          return (
                            <div className='right-answer-flex' key={answer}>
                              <div>{answer}</div>
                              <Icon color="olive" name="checkmark"></Icon>
                            </div>
                          )
                        } else {
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


            })) : <div />
        }
        <div className="two-button-flex">
          <Button color="orange" onClick={this.showAddForm}>Add Another Question</Button>
          <Button color="purple" onClick={this.saveQuiz}>Generate Quiz</Button>
        </div>
        {showAddForm && <TeacherAddQuestion match={this.props.match} />}
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
