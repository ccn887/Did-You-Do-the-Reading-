import firebase from '../../server/firebase'

const ADD_TO_STUDENT_SCORE = 'ADD_TO_STUDENT_SCORE'
const ADD_TO_STUDENT_STREAK = 'ADD_TO_STUDENT_STREAK '
const BREAK_STREAK = 'BREAK_STREAK'
const GET_SINGLE_STUDENT = 'GET_SINGLE_STUDENT'


export const addToStudentScoreActionCreator = updatedStudent => ({ type: ADD_TO_STUDENT_SCORE, updatedStudent })
export const addToStudentStreakActionCreator = updatedStudent => ({ type: ADD_TO_STUDENT_STREAK, updatedStudent })
export const breakStudentStreakActionCreator = updatedStudent => ({ type: BREAK_STREAK, updatedStudent })
export const getSingleStudentActionCreator = student => ({ type: GET_SINGLE_STUDENT, student })

const database = firebase.database()
const activeListeners = {}

export const addToStudentScore = (studentId) => dispatch => {
  const usersRef = database.ref(`users/${studentId}/score`)
    .transaction(function (score) {
      return score + 1
    })
  const updatedUserRef = database.ref(`users/${studentId}`)
    .once('value', snapshot => {
      dispatch(addToStudentScoreActionCreator(snapshot.val()))
    })
}


export const addToStudentStreak = (studentId) => dispatch => {
  const usersRefStreak = database.ref(`users/${studentId}/streak`)
    .transaction(function (streak) {
      console.log('reducer streak', streak)
      return streak + 1
    })
  const updatedUserRef = database.ref(`users/${studentId}`)
    .once('value', snapshot => {
      dispatch(addToStudentStreakActionCreator(snapshot.val()))
    })
}

export const breakStudentStreak = (studentId) => dispatch => {
  const usersLosingRef = database.ref(`users/${studentId}/streak`)
    .transaction(function (streak) {
      return 0
    })
  const updatedUserRef = database.ref(`users/${studentId}`)
    .once('value', snapshot => {
      dispatch(breakStudentStreakActionCreator(snapshot.val()))
    })
}

export const getSingleStudentListener = (studentId) => dispatch => {
  const path = `users/${studentId}/`
  const ref = database.ref(path)
  const listener = (snapshot) => {
    dispatch(getSingleStudentActionCreator(snapshot.val()))
  }
  activeListeners[path] = { ref, listener }
  ref.on('value', listener)
}


export const stopListeningForSingleStudent = (studentId) => dispatch => {
  const path = `users/${studentId}/`
  const { ref, listener } = activeListeners[path]
  ref.off('value', listener)
  delete activeListeners[path]
}



export default function (student = {}, action) {
  switch (action.type) {
    case ADD_TO_STUDENT_SCORE:
      return action.updatedStudent
    case ADD_TO_STUDENT_STREAK:
      return action.updatedStudent
    case BREAK_STREAK:
      return action.updatedStudent
    case GET_SINGLE_STUDENT:
      return action.student
    default:
      return student
  }

}
