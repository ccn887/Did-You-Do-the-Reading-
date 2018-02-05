import React, { Component } from 'react'
import { Table, Container, Button } from 'semantic-ui-react'
import { connect } from 'react-redux'
import history from '../../../history'
import Leaderboard from '../../Leaderboard'
import Navbar from '../../Navbar'


export default class TeacherGameLimbo extends Component {
  render() {
    console.log('gameover screen')
    return (
      <div id="teacher-game-over">
        <Navbar />
        <h1> THE GAME IS OVER </h1>
        <Leaderboard />
      </div>
    )
  }
}
