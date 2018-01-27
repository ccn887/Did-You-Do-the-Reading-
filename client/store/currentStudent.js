import history from '../history'
import firebase from '../../server/firebase'

const SET_CURRENT_STUDENT = 'SET_CURRENT_STUDENT'


export const setCurrentStudent = id => ({type: SET_CURRENT_STUDENT, id})





export default function (currentStudentId = '', action) {
  switch (action.type) {
    case SET_CURRENT_STUDENT:
    return action.id
    default:
      return currentStudentId
  }
}
