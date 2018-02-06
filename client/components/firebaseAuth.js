import React, { Component } from 'react'
import { Form, Input, Button, Container } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { logInStudentThunk, signUpStudentThunk, resetStudentScore, breakStudentStreak} from '../store'
import firebase from '../../server/firebase'
import history from '../history'
import Header from './Header'
import { Link } from 'react-router-dom'


export class FirebaseAuth extends Component {

  constructor(){
    super()
    this.state = {
      email: '',
      password: '',
      loginError: false,
      pwdWaring: false,
      emailWarning: false
    }
  }

  componentWillReceiveProps(nextProps){
    if (nextProps.firebaseUser.code || nextProps.firebaseUser.message){
      this.setState({ loginError: true})
    }
    else {
      this.setState({ loginError: false })
    }
  }

  inputEmail = (evt) => {
    this.setState({email: evt.target.value})
  }

  inputPassword = (evt) => {
    this.setState({password: evt.target.value})
  }

  login = (evt) => {
    evt.preventDefault();
    this.props.logInStudentThunk(this.state.email, this.state.password)
  }

  signup = (evt) => {
    evt.preventDefault();
    if (this.state.password.length < 9 ){
      this.setState({pwdWarning: true})
    }
    if (!this.state.email.includes('@') || !this.state.email.includes('.')){
      this.setState({emailWarning: true})
    }
    else {
      console.log('you clicked signup!')
      this.props.signUpStudentThunk(this.state.email, this.state.password);
    }

  }

  logout = (evt) => {
    evt.preventDefault();
    const studentId = this.props.firebaseUser.uid

    this.props.resetStudentScore(studentId);
    this.props.breakStudentStreak(studentId);

    firebase.auth().signOut();
    history.push(`/`)
  }

  handleClick(evt) {
    evt.preventDefault();
    history.push('/')
  }

  render(){


    return (
      <div>
      <center>
        <Header />
      </center>
      <div id="student-portal">
        {
          this.props.firebaseUser.uid
          ?
          <div id="student-portal-logged-in">
            <h4> You're already logged in as {this.props.firebaseUser.email} !</h4>
            <Button color="orange" onClick={() => history.push(`/join`)}>Join A Game</Button>
            <br />
            <Button color="purple" onClick={this.logout}>Log Out</Button>
            <br />
            <Link id="back-for-students" to="/"> <Button color="black">Back</Button></Link>
          </div>
          :
          <Form id="student-signup">
            <h2> Student Login </h2>
            <Form.Field>
              <label className="white-text">Email</label>
              <input onChange={this.inputEmail} type="email" placeholder='email' />
            </Form.Field>
            {this.state.emailWarning && <div className="warning">please enter a valid email address</div>}
            <Form.Field>
              <label className="white-text" >Password</label>
              <input onChange={this.inputPassword} type="password" placeholder='password' />
            </Form.Field>
            {this.state.pwdWarning && <div className="warning">password must be at least 9 characters</div>}
            <Button color="purple" onClick={this.login}>Log In</Button>
            <center>
              <div className="white-text">
                - or -
              </div>
            </center>
            <Button color="orange" type="submit" onClick={this.signup}>Sign Up</Button>
            {this.state.loginError && <div>incorrect email or password</div> }
            <br />
            <Button
              color="black"
              value="back"
              onClick={this.handleClick}>Back to Home</Button>
          </Form>
        }
    </div>
  </div>
    )
  }


}


const mapDispatch = {logInStudentThunk, signUpStudentThunk, resetStudentScore, breakStudentStreak}

const mapState = state => {
  return {
    firebaseUser: state.firebaseUser
  }
}

export default connect(mapState, mapDispatch)(FirebaseAuth)
