import React, { Component } from 'react'
import { Table, Container, Button } from 'semantic-ui-react'
import { connect } from 'react-redux'
import history from '../../../history'
import Leaderboard from '../../Leaderboard'
import Navbar from '../../Navbar'
import Header  from '../../Header'
import { Link } from 'react-router-dom'



export default class TeacherGameLimbo extends Component {
  render() {
    console.log('gameover screen')
    return (
      <div id="teacher-game-over">
        <center>
          <Header />
        </center>
        <Link id="back-for-students" to="/"> <Button color="black">Back to Home</Button></Link>
        <h1> THE GAME IS OVER </h1>
        <Leaderboard />
      </div>
    )
  }
}
