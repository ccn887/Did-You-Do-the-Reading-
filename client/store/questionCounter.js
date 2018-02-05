import firebase from '../../server/firebase'

/* -----------------    ACTIONS     ------------------ */

const SET_Q_NUMBER_ON_STATE = 'SET_Q_NUMBER_ON_STATE'


/* ------------   ACTION CREATORS     ------------------ */

export const setQnumberOnState = num => ({type: SET_Q_NUMBER_ON_STATE, num})


/* ------------       THUNK CREATORS     ------------------ */

export const determineQuestionNumber = (questionId, gameObj) => dispatch => {
  const questionIdArray = Object.keys(gameObj);

  const qNumber = questionIdArray.indexOf(questionId) + 1

  dispatch(setQnumberOnState(qNumber))
}

/* ------------       REDUCER     ------------------ */


export default function (num = 0, action) {
  switch (action.type) {
    case SET_Q_NUMBER_ON_STATE:
      return action.num
    default:
      return num
  }
}
