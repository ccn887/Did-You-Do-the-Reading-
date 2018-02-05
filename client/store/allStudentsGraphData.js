
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


//find all users with a uid
//store them in an array
//for each user...
  //fetch their game history list
  //make that an array
  //map that array to...
    // user.graphData = [{time: ??, score: ??}, {time: ??, score: ??}]

//set new user array with user data on state?

export const fetchAllStudentsWithScoreData = () => dispatch => {
  const allData = {};

  database.ref('users')
    .once('value', async idSnap => {
      const studentIdArray = Object.keys(idSnap.val())
      try {
        await Promise.all(studentIdArray.map(studentId => {
          return database.ref(`gameHistoryList/${studentId}`)
            .once('value')
            .then(historySnap => {
              const studentGameListObj = historySnap.val();
              if (studentGameListObj){
                const gameHistoryArray = Object.values(studentGameListObj)
                const dayGameHistoryArray = gameHistoryArray.map(gameHistoryInstance => {
                  return {
                    date: (Math.floor(gameHistoryInstance.date / 86400000 - 17520 )),
                    score: gameHistoryInstance.score
                  }
                })
                allData[studentId] = dayGameHistoryArray.filter(historyInstance => {
                  return historyInstance.score && historyInstance.date && true
                })
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
