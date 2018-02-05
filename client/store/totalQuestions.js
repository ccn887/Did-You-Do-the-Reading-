import firebase from '../../server/firebase'

/* -----------------    ACTIONS     ------------------ */

const SET_TOTAL_QS_ON_STATE = 'SET_TOTAL_QS_ON_STATE'

/* ------------   ACTION CREATORS     ------------------ */

export const setTotalQsOnState = num => ({type: SET_TOTAL_QS_ON_STATE, num})

/* ------------       THUNK CREATORS     ------------------ */

export const fetchTotalQuestions = id => dispatch => {
  firebase.database().ref(`gameRooms/${id}/`)
    .once('value', snapshot => {
      const currentGame = snapshot.val();
      dispatch(setTotalQsOnState(currentGame.totalQuestions))
      });
  }


/* ------------       REDUCER     ------------------ */


export default function (num = 0, action) {
  switch (action.type) {
    case SET_TOTAL_QS_ON_STATE:
      return action.num
    default:
      return num
  }
}
