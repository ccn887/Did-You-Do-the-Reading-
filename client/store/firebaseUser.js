import history from '../history'
import firebase from '../../server/firebase'



/* -----------------    ACTIONS     ------------------ */

const SET_FIREBASE_USER_ON_STATE = 'SET_FIREBASE_USER_ON_STATE';

const REMOVE_FIREBASE_USER_FROM_STATE = 'REMOVE_FIREBASE_USER_FROM_STATE';

const SET_ERR_ON_STATE = 'SET_ERR_ON_STATE'


/* ------------   ACTION CREATORS     ------------------ */

export const setFirebaseUserOnState = user => {
  return {
    type: SET_FIREBASE_USER_ON_STATE,
    user
  }
}

export const removeFirebaseUserFromState = () => {
  return {
    type: REMOVE_FIREBASE_USER_FROM_STATE,
    user: {}
  }
}

export const setErrorMessageOnState = err => {
  return {
    type: SET_ERR_ON_STATE,
    err
  }
}

/* ------------       THUNK CREATORS     ------------------ */

export const logInStudentThunk = (email, password) => dispatch => {

  firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
    .then( () => {
      return firebase.auth().signInWithEmailAndPassword(email, password);
    })
    .then(userPromise => dispatch(setFirebaseUserOnState(userPromise)))
    .then( () =>   history.push('/join'))
    .catch(err => {
      console.error(err)
      console.log(Object.keys(err))
      dispatch(setErrorMessageOnState(err))
    })
}

export const signUpStudentThunk = (email, password) => dispatch => {

  firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
    .then( () => {
      return firebase.auth().createUserWithEmailAndPassword(email, password);
    })
    .then(userPromise => dispatch(setFirebaseUserOnState(userPromise)))
    .catch(err => console.error(err));

  history.push('/join')
}



/* ------------       REDUCER     ------------------ */

export default function (user = {}, action){
  switch (action.type){
    case SET_FIREBASE_USER_ON_STATE:
      return action.user
    case REMOVE_FIREBASE_USER_FROM_STATE:
      return action.user
    case SET_ERR_ON_STATE:
      return action.err
    default:
      return user;
  }

}
