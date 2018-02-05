import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Switch, Router } from 'react-router-dom'
import PropTypes from 'prop-types'
import history from './history'
import {
  Main,
  Login,
  Signup,
  UserHome,
  MakeQuiz,
  AllQuestions,
  StudentJoinGame,
  StudentGameOver,
  StudentWaitingRoom,
  StudentAnswerReveal,
  StudentSingleQuestion,
  TeacherAnswerReveal,
  TeacherDashboard,
  TeacherWaitingRoom,
  TeacherSingleQuestion,
  TeacherGraphs,
  TeacherGameLimbo,
  TeacherLogin,
  Home,
  Leaderboard,
  FirebaseAuth} from './components'
import { me, setFirebaseUserOnState } from './store'
import firebase from '../server/firebase'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {

    const auth = firebase.auth();


    this.props.loadInitialData()

    this.unListen = auth.onAuthStateChanged(user => {
      if (user){
        //do something
        this.props.setFbUserOnState(user)
      }
      else {
        //do something else
        console.log('YOURE NOT LOGGED IN FOOL')
      }
    })
  }

  componentWillUnmount(){
    this.unListen();
  }

  render() {
    const { isLoggedIn } = this.props

    return (
      <Router history={history}>
        <Main>
          <Switch>
            {/* Routes placed here are available to all visitors */}
            <Route exact path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route exact path="/teacherlogin" component={TeacherLogin} />
            <Route path="/join" component={StudentJoinGame} />
            <Route
              exact
              path="/student-waiting-room/:pin/:studentId"
              component={StudentWaitingRoom}
            />
            <Route
              exact
              path="/:pin/question/:questionId/:studentId"
              component={StudentSingleQuestion}
            />
            <Route
              exact
              path="/:pin/waiting/:questionId/:studentId"
              component={StudentAnswerReveal}
            />
            <Route
              exact
              path="/student/:pin/gameOver"
              component={StudentGameOver}
            />
            <Route
              exact
              path="/student/login"
              component={FirebaseAuth}
            />

            {
              isLoggedIn &&
              <Switch>
                {/* Routes placed here are only available after logging in */}

                <Route
                exact path="/"
                component={TeacherDashboard}
                />
                <Route
                  exact
                  path="/make-quiz"
                  component={MakeQuiz}
                />
                <Route
                  exact
                  path="/:questionSetId/all-questions"
                  component={AllQuestions}
                />
                <Route
                  exact
                  path="/teacher-waiting-room/:pin"
                  component={TeacherWaitingRoom}
                />
                <Route
                  exact
                  path="/teacher/:pin/question/:questionId"
                  component={TeacherSingleQuestion}
                />
                <Route
                  exact
                  path="/teacher/:pin/answer/:questionId"
                  component={TeacherAnswerReveal}
                />
                <Route
                  exact
                  path="/teacher/:pin/gameOver"
                  component={TeacherGameLimbo}
                />
                <Route
                  exact
                  path="/teacher/graphs"
                  component={TeacherGraphs}
                />
                <Route
                component={TeacherDashboard}
                />

              </Switch>
            }
            {/* Displays our Login component as a fallback */}
            <Route component={Home} />
          </Switch>
        </Main>
      </Router>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me())
    },
    setFbUserOnState(user) {
      dispatch(setFirebaseUserOnState(user))
    }
  }
}

export default connect(mapState, mapDispatch)(Routes)

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
