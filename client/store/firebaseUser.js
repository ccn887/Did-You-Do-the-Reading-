import history from '../history'
import firebase from '../../server/firebase'



/* -----------------    ACTIONS     ------------------ */

const SET_FIREBASE_USER_ON_STATE = 'SET_FIREBASE_USER_ON_STATE';

const REMOVE_FIREBASE_USER_FROM_STATE = 'REMOVE_FIREBASE_USER_FROM_STATE'


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

/* ------------       THUNK CREATORS     ------------------ */

export const logInStudentThunk = (email, password) => dispatch => {

  firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
    .then( () => {
      return firebase.auth().signInWithEmailAndPassword(email, password);
    })
    .then(userPromise => dispatch(setFirebaseUserOnState(userPromise)))
    .catch(err => console.error(err));

  history.push('/join')
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
    default:
      return user;
  }

}
