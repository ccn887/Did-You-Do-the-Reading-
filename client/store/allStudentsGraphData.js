
import firebase from '../../server/firebase'

/* -----------------    ACTIONS     ------------------ */

const SET_ALL_STUDENTS_SCORE_DATA_ON_STATE = 'SET_ALL_STUDENTS_SCORE_DATA_ON_STATE';

/* ------------   ACTION CREATORS     ------------------ */

export const setAllStudentsScoreDataOnState = data => {
  return {
    type: SET_ALL_STUDENTS_SCORE_DATA_ON_STATE,
    data
  }
}

/* ------------       THUNK HELPERS     ------------------ */

const database = firebase.database()

/* ------------       THUNK CREATORS     ------------------ */



export const fetchAllStudentsWithScoreData = () => dispatch => {
  const allData = {};

  database.ref('users')
    .once('value', async idSnap => {
      //this is an array of all the studentId's in the users table

      const emailArray = Object.values(idSnap.val()).map(userInstance => {
        return userInstance.email
      })

      const studentIdArray = Object.keys(idSnap.val())

      try {
        // this looks for each of those in game history
        await Promise.all(studentIdArray.map((studentId, idx) => {
          return database.ref(`gameHistoryList/${studentId}`)
            .once('value')
            .then(historySnap => {
              const studentGameListObj = historySnap.val();
              if (studentGameListObj){
                const gameHistoryArray = Object.values(studentGameListObj)
                const dayGameHistoryArray = gameHistoryArray.map(gameHistoryInstance => {
                  return {
                    date: gameHistoryInstance.date,
                    game: gameHistoryInstance.gamePin,
                    score: gameHistoryInstance.score
                  }
                })
                allData[studentId] = {}
                allData[studentId].data = dayGameHistoryArray.filter(historyInstance => {
                  return historyInstance.score && historyInstance.date && true
                })
                allData[studentId].email = emailArray[idx]
              }
            })
        }))
        dispatch(setAllStudentsScoreDataOnState(allData))
      }
      catch (err){
        console.error(err)
      }
    })

}






/* ------------       REDUCER     ------------------ */

export default function (data = {}, action){
  switch (action.type){
    case SET_ALL_STUDENTS_SCORE_DATA_ON_STATE:
      return action.data
    default:
      return data;
  }

}
