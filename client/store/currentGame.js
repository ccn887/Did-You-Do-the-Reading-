import history from '../history'
import firebase from '../../server/firebase'


const SET_GAME_ON_STATE = 'SET_GAME_ON_STATE'




export const setGameOnState = game => ({type: SET_GAME_ON_STATE, game})


export const setGameOnStateThunk = (id) => dispatch =>{
  firebase.database().ref(`gameRooms/${id}/quiz`)
      .once('value', snapshot => {
        const currentGame = snapshot.val();
        dispatch(setGameOnState(currentGame))
        });

}



export default function (currentGame = {}, action) {
  switch (action.type) {
    case SET_GAME_ON_STATE:
    return action.game
    default:
      return currentGame
  }
}
