import firebase from '../../../../server/firebase'
import React, { Component } from 'react'
import { Form, Input, Button, Container, Message } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { me } from '../../../store';

export class TeacherAddQuestion extends Component {
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
    console.log(this.props)
    const questionSetId = this.props.match.params.questionSetId
    firebase.database().ref(`questionSets/${questionSetId}`).push({
        question: e.target.question.value,
        rightAnswer: e.target.solution.value,
        answers: [e.target.solution.value, e.target.wrongOne.value, e.target.wrongTwo.value, e.target.wrongThree.value]
    })
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
            <Container>
              <Message className="add-new-question">
                <Form onSubmit = {this.addQuestion}>
                  <div className="right-answer-flex">
                    <label> Question
                      <Input type = "text" name = "question"/>
                    </label>
                    <label> Solution
                      <Input type = "text" name = "solution"/>
                    </label>
                  </div>
                  <div className="right-answer-flex">
                    <label> Wrong Answer 1
                      <Input type = "text" name = "wrongOne"/>
                    </label>
                    <label> Wrong Answer 2
                      <Input type = "text" name = "wrongTwo"/>
                    </label>
                    <label> Wrong Answer 3
                      <Input type = "text" name = "wrongThree"/>
                    </label>
                  </div>
                  <Button type = "Submit" value = "submit"> Add Question </Button>
                </Form>
              </Message>
            </Container>
                )
  }
}

const mapState = state => {
    return { user: state.user }
  }

  const mapDispatch = {me}

  export default connect(mapState, mapDispatch)(TeacherAddQuestion)

// const mapState = state => {
//   return { currentGame: state.currentGame }
// }


// export default connect(mapState)(StudentWaitingRoom)
