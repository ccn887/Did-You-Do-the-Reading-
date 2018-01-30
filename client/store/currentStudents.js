import history from '../history'
import firebase from '../../server/firebase'


/*Actions */

const UPDATE_STUDENT_LIST = 'UPDATE_STUDENT_LIST'

/* Action creators */

export const updateStudentList = list => ({type: UPDATE_STUDENT_LIST, list})




/* thunk helpers */

const database = firebase.database()
const activeListeners = {}


  /*Thunks*/
export const listenForNewStudents =  (gameId) => (dispatch) => {
   const path = `gameRooms/${gameId}/users`
   const ref = database.ref(path)
   const listener = (snapshot) => {
     dispatch(updateStudentList(snapshot.val()))
   }
   activeListeners[path] = { ref, listener }
   ref.on('value', listener)
 }


 export const stopListeningForNewStudents = (gameId) => (dispatch) => {
   const path = `gameRooms/${gameId}/users`
   const { ref, listener } = activeListeners[path]
   ref.off('value', listener)
   delete activeListeners[path]
 }


 /* Reducer */

 export default function (list = {}, action) {
    switch (action.type) {
     case UPDATE_STUDENT_LIST:
       return action.list
      default:
       return list
    }
  }
