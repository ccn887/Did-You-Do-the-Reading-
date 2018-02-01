import React, { Component } from 'react'
import { Form, Input, Button } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { listenForNewStudents } from '../../../store'
import Leaderboard from '../../Leaderboard'



export default class StudentGameOver extends Component {
  render() {
    return (
      <Leaderboard />
    )
  }
}
