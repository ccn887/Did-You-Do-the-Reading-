import history from '../history'
import firebase from '../../server/firebase'


const SET_GAME_ID = 'SET_GAME_ID'




export const setGameId = id => ({type: SET_GAME_ID, id})


export default function (currentGameId = '', action) {
  switch (action.type) {
    case SET_GAME_ID:
    return action.id
    default:
      return currentGameId
  }
}
