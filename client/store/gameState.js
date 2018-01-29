import history from '../history'
import firebase from '../../server/firebase'


/*Actions */
// const SET_GAME_STATE = 'SET_GAME_STATE';
const GET_GAME_STATE = 'GET_GAME_STATE';


/* Action creators */

export const setGameState = (gameState) => ({type: SET_GAME_STATE, gameState})
export const getGameState = (gameState) => ({type: GET_GAME_STATE, gameState})


/* thunk helpers */
const database = firebase.database()
const activeListeners = {}


/*Thunks*/
export const listenForGameStateChange = (gameId) => (dispatch) => {
  const path = `gameRooms/${gameId}/gameState`;
  const ref = database.ref(path)

  const listener = snapshot => {
    dispatch(getGameState(snapshot.val()))
  }
  activeListeners[path] = { ref, listener }
  ref.on('value', listener);
}

export const stopListeningForGameState = gameId => dispatch => {
  const path = `gameRooms/${gameId}/gameState`;
  const { ref, listener } = activeListeners[path];

  ref.off('value', listener)
  delete activeListeners[path];
}

export const updateGameState = (gameId, newGameState) => dispatch => {
  database.ref(`gameRooms/${gameId}/gameState`)
    .set(newGameState)
  dispatch(getGameState(newGameState));
}

export default function(gameState = '', action) {
  switch (action.type){
    case GET_GAME_STATE:
      return action.gameState
    default:
      return gameState
  }
}
