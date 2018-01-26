import React, {Component} from 'react'
import firebase from '../../../../server/firebase'

export default class TeacherAnswerReveal extends Component{
  constructor(){
    super()
    this.state = {
      lastQuestionId: null,
      nextQuestionId: null,
      currentRightAnswer: ''
    }
  }

  componentDidMount(){


  }

}

