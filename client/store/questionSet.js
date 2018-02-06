import history from '../history'
import firebase from '../../server/firebase'
import { tokenize } from './utils'
import axios from 'axios'


/* -----------------    ACTIONS     ------------------ */

const SET_QUESTION_SET_ON_STATE = 'SET_QUESTION_SET_ON_STATE';


/* ------------   ACTION CREATORS     ------------------ */

export const setQuestionSetOnState = questionSet => {
  return {
    type: SET_QUESTION_SET_ON_STATE,
    questionSet
  }
}


/* ------------       THUNK HELPERS     ------------------ */

const activeListeners = {}


/* ------------       THUNK CREATORS     ------------------ */


export const generateQuestionSetThunk = (text) => async dispatch => {
  console.log('generating question set!')
  let res = await axios.post('/api/text/vocab', tokenize(text));
  let questionArray = res.data;
  let res2 = await axios.post('/api/quoteText/quoteQuestion', { content: text });
  let questionArray2 = res2.data
  let res3 = await axios.post('/api/quoteText/whoDidItQuestion', { content: text });
  let questionArray3 = res3.data
  let res4 = await axios.post('/api/keywordText/keywordQuestion', { content: text });
  let questionArray4 = res4.data

  let finalQuestionArray = questionArray.concat(questionArray2, questionArray3, questionArray4)
  const questionSetRef = firebase.database().ref('questionSets');
  let newQuestionSetRef = questionSetRef.push({})
  finalQuestionArray.forEach(questionObj => {
    firebase.database().ref(`questionSets/${newQuestionSetRef.key}`)
      .push(questionObj)
  })
  history.push(`/${newQuestionSetRef.key}/all-questions`)
}

export const fetchQuestionSetThunk = (qSetId) => dispatch => {
  const path = `questionSets/${qSetId}`
  const ref = firebase.database().ref(path)
  const listener = snapshot => {
    dispatch(setQuestionSetOnState(snapshot.val()))
  }
  activeListeners[path] = { ref, listener }
  ref.on('value', listener)
}

export const stopFetchingQuestionSetsThunk = qSetId => dispatch => {
  const path = `questionSets/${qSetId}`
  const { ref, listener } = activeListeners[path]
  ref.off('value', listener)
  delete activeListeners[path]
}

export const deleteQuestionFromSetThunk = (qSetId, qestionId) => async dispatch => {
  const questionRef = firebase.database().ref(`questionSets/${qSetId}`).child(qestionId)
  questionRef.remove()
    .catch((error) => console.error('error removing question: ', error))
}

export const addQuestionToSetThunk = (qSetId, question) => dispatch => {
  firebase.database().ref(`questionSets/${qSetId}`).push(question)
}

export const editQuestionToSetThunk = (qSetId, questionId, question) => dispatch => {
  console.log("got here thunk")
  const questionRef = firebase.database().ref(`questionSets/${qSetId}`).child(questionId)
  questionRef.update(question)
  .catch((error) => console.error('error editing question: ', error))
}



/* ------------       REDUCER     ------------------ */

export default function (questionSet = {}, action) {
  switch (action.type) {
    case SET_QUESTION_SET_ON_STATE:
      return action.questionSet;
    default:
      return questionSet;
  }
}
