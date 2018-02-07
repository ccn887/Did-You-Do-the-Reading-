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


export const generateQuestionSetThunk = (text, activeQs) => async dispatch => {
  let questionArray = [], questionArray2 = [], questionArray3 = [], questionArray4 = [], questionArray5 = []

  function shuffle(originalArray) {
    var array = [].concat(originalArray);
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }

try{
  if(activeQs.includes('1')){
  let res = await axios.post('/api/text/vocab', tokenize(text));
  questionArray = res.data
  }
  if(activeQs.includes('2')){
  let res2 = await axios.post('/api/quoteText/quoteQuestion', { content: text });
  questionArray2 = res2.data
  }
  if(activeQs.includes('3')){
  let res3 = await axios.post('/api/quoteText/whoDidItQuestion', { content: text })
  questionArray3 = res3.data
  }
  if(activeQs.includes('4')){
  let res4 = await axios.post('/api/keywordText/keywordQuestion', { content: text });
  questionArray4 = res4.data
  }
  if(activeQs.includes('5')){
  let res5 = await axios.post('/api/plotText/plotQuestion', { content: text });
  questionArray5 = res5.data
  }

  let finalQuestionArray = shuffle(questionArray.concat(questionArray2, questionArray3, questionArray4, questionArray5))

  const questionSetRef = firebase.database().ref('questionSets');
  let newQuestionSetRef = questionSetRef.push({})
  finalQuestionArray.forEach(questionObj => {
    firebase.database().ref(`questionSets/${newQuestionSetRef.key}`)
      .push(questionObj)
  })
  history.push(`/${newQuestionSetRef.key}/all-questions`)
}
catch(err){
  next(err)
}
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
