import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import user from './user'
import currentGame from './currentGame'
import currentQuestion from './currentQuestion'
import currentStudents from './currentStudents'
import gameState from './gameState'
import singleStudent from './singleStudent'
import questionSet from './questionSet'




const reducer = combineReducers(
  {
    user,
    currentGame,
    currentStudents,
    currentQuestion,
    singleStudent,
    gameState,
    questionSet
  }
)

const middleware = composeWithDevTools(applyMiddleware(
  thunkMiddleware,
  createLogger({collapsed: true})
))
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './currentGame'
export * from './currentQuestion'
export * from './currentStudents'
export * from './gameState'
export * from './singleStudent'
export * from './questionSet'
