import firebase from '../../../../server/firebase'
import React, { Component } from 'react'
import { Form, TextArea, Input, Button } from 'semantic-ui-react'
import { connect } from 'react-redux'

export default class TeacherAddQuestion extends Component {
    constructor() {
        super()
        this.state = {
        }
        this.addQuestion = this.addQuestion.bind(this)

    }
    componentDidMount() {
        // const gameId = this.props.match.params.pin
        // const users = this.state.users
        // const gameRoomRef = firebase.database().ref(`gameRooms/${gameId}/users`)
        //   .on('value', (snapshot) => {
        //     let newuser = snapshot.val()
        //     this.setState({
        //       users: newuser
        //     })
        //   })
    }

    //   async playGame(e) {
    //     // e.preventDefault();
    // const questionSetId = this.props.match.params.questionSetId
    // const questionSetRef = await firebase.database().ref(`questionSets/${questionSetId}`).child(idx)
    //   .once('value', async (snapshot) => {
    //     try {
    //       const questionSetRef = await firebase.database().ref(`questionSets/${questionSetId}`).child(idx)
    //       questionSetRef.remove()
    //     }
    //     catch (err) {
    //       console.log(err)
    //     }
    //   })

    //   }
 addQuestion (e) {
    e.preventDefault()
    console.log(e.target.question.value)
    // const questionSetId = this.props.match.params.questionSetId
    // firebase.database().ref(`questionSets/${questionSetId}`)
    // try {
    //     const something = await someshit
    //       }
    //       catch (err) {
    //         console.log(err)
    //       }
    }


    render() {
        // const users = Object.keys(this.state.users)

        return (
            <div>
                <Form onSubmit = {this.addQuestion}>
                    <label> Question
                  </label>
                  <Input type = "text" name = "question"/> 
                  <label> Solution
                  <Input type = "text" name = "solution"/> 
                  </label>
                  <label> Wrong Answer 1
                  <Input type = "text" name = "wrongOne"/> 
                  </label>
                  <label> Wrong Answer 2
                  <Input type = "text" name = "wrongTwo"/> 
                  </label>
                  <label> Wrong Answer 3
                  <Input type = "text" name = "wrongThree"/> 
                  </label>
                  <Button type = "Submit" value = "submit"> Add Question </Button>
                    </Form>

      </div>
                )
  }
}

// const mapState = state => {
//   return { currentGame: state.currentGame }
// }


// export default connect(mapState)(StudentWaitingRoom)
