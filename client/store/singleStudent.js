import firebase from '../../server/firebase'
import history from '../history'

/* -----------------    ACTIONS     ------------------ */

const ADD_TO_STUDENT_SCORE = 'ADD_TO_STUDENT_SCORE'
const ADD_TO_STUDENT_STREAK = 'ADD_TO_STUDENT_STREAK '
const BREAK_STREAK = 'BREAK_STREAK'
const GET_SINGLE_STUDENT = 'GET_SINGLE_STUDENT'
const GET_STUDENT_ONCE = 'GET_STUDENT_ONCE'

/* ------------   ACTION CREATORS     ------------------ */

export const addToStudentScoreActionCreator = updatedStudent => ({ type: ADD_TO_STUDENT_SCORE, updatedStudent })
export const addToStudentStreakActionCreator = updatedStudent => ({ type: ADD_TO_STUDENT_STREAK, updatedStudent })
export const breakStudentStreakActionCreator = updatedStudent => ({ type: BREAK_STREAK, updatedStudent })
export const getSingleStudentActionCreator = student => ({ type: GET_SINGLE_STUDENT, student })
export const getSingleStudentOnceActionCreator = student => ({ type: GET_STUDENT_ONCE, student })

/* ------------   THUNK HELPERS    ------------------ */

const database = firebase.database()
const activeListeners = {}

/* ------------       THUNK CREATORS     ------------------ */

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

export const getSingleStudentOnce = (studentId) => dispatch => {
  const path = `users/${studentId}/`
  const ref = database.ref(path)
  // console.log('this should be the students ID: ', studentId)
  // console.log('path: ', path)
  const listener = (snapshot) => {
    console.log('snapshot to be sent back: ', snapshot.val())
    dispatch(getSingleStudentOnceActionCreator(snapshot.val()))
  }
  activeListeners[path] = { ref, listener }
  ref.once('value', listener)
}


export const stopListeningForSingleStudent = (studentId) => dispatch => {
  const path = `users/${studentId}/`
  const { ref, listener } = activeListeners[path]
  ref.off('value', listener)
  delete activeListeners[path]
}

export const addStudentToGameThunk = (name, currentGame) => dispatch => {
  const usersRef = firebase.database().ref('users')
    .push({
      name: name,
      score: 0,
      streak: 0,
      currentGame: currentGame
    })
  const studentId = usersRef.key
  firebase.database().ref(`gameRooms/${currentGame}/users`)
    .push(studentId)

    history.push(`/student-waiting-room/${currentGame}/${studentId}`)
}


/* ------------       REDUCER     ------------------ */

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
    case GET_STUDENT_ONCE:
      return action.student
    default:
      return student
  }

}
