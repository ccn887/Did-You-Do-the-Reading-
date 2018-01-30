import firebase from '../../server/firebase'

const GET_CURRENT_TEACHER_GAMES = 'GET_CURRENT_TEACHER_GAMES'

export const getCurrentTeacherGamesActionCreator = teacherGames => ({ type: GET_CURRENT_TEACHER_GAMES, teacherGames })

export const getCurrentTeacherGames = (teacherId) => dispatch => {
  firebase.database().ref(`gameRooms`)
    .once('value', snapshot => {
      const gameRoomsObj = snapshot.val()
      console.log('gameRooms?', gameRoomsObj)

      const newArr = Object.keys(gameRoomsObj)
      console.log('newArr?', newArr)

      const filteredArr = newArr.filter(pin => {
        return gameRoomsObj[pin].teacherId === teacherId
      })
      .map(gamePin => {
        return gameRoomsObj[gamePin]
      }
      )
      console.log('filteredArr?', filteredArr)

      dispatch(getCurrentTeacherGamesActionCreator(filteredArr))
    })
}

export default function (teacherGames = [], action) {
  switch (action.type) {
    case GET_CURRENT_TEACHER_GAMES:
      return action.teacherGames
      default:
      return teacherGames
  }
}
