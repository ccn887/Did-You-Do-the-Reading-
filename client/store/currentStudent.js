import history from '../history'
import firebase from '../../server/firebase'

const SET_CURRENT_STUDENT = 'SET_CURRENT_STUDENT'
const UPDATE_STUDENT_LIST = 'UPDATE_STUDENT_LIST'


export const setCurrentStudent = id => ({type: SET_CURRENT_STUDENT, id})
export const updateStudentList = list => ({type: UPDATE_STUDENT_LIST, list})


const database = firebase.database()


const activeListeners = {}

export const listenToGameRoom (gameId) => (dispatch) => {
  const path = `gameRooms/${gameId}/users`
  const ref = database.ref(path)
  const listener = (snapshot) => {
    dispatch(updateStudentList(snapshot.val()))
  }
  activeListeners[path] = { ref, listener }
  ref.on('value', listener)
}

export const unlistenFromGameRoom (gameId) => (dispatch) => {
  const path = `gameRooms/${gameId}/users`
  const { ref, listener } = activeListeners[path]
  ref.off(listener)
  delete activeListeners[path]
}

export default function (list={}, action) {
  switch (action.type) {
    case UPDATE_STUDENT_LIST:
      return Object.values(action.list)
    default:
      return list
  }
}
