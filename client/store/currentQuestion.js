import history from '../history'
import firebase from '../../server/firebase'


const SET_CURRENT_QUESTION = 'SET_CURRENT_QUESTION'


export const setCurrentQuestion = question => ({type: SET_CURRENT_QUESTION, question})


export const setCurrentQuestionThunk = (qId, pin) => dispatch =>{
  firebase.database().ref(`gameRooms/${pin}/quiz/${qId}`)
      .once('value', snapshot => {
        const currentQuestion = snapshot.val();
        console.log('currentqfromfb', currentQuestion)
        dispatch(setCurrentQuestion(currentQuestion))
        });

}



export default function (currentQuestion = {}, action) {
  switch (action.type) {
    case SET_CURRENT_QUESTION:
    return action.question
    default:
      return currentQuestion
  }
}
