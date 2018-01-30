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
     if (!snapshot.val()) return
     const studentIds = Object.values(snapshot.val())
    database.ref('users').once('value').then(snapshot2 => {
       let users = snapshot2.val()
       console.log("Users in thunk", studentIds)
       dispatch(updateStudentList(studentIds.map(id => users[id])))
     })

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

 export default function (list = [], action) {
    switch (action.type) {
     case UPDATE_STUDENT_LIST:
       return action.list
      default:
       return list
    }
  }
