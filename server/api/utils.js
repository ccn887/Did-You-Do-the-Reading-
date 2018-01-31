const axios = require('axios');

const API_KEY = process.env.WORDS_API_KEY;
const API_KEY_BACKUP = process.env.BACKUP_WORDS_API_KEY;
const GOOGLE_NAT_LANG_API_KEY = process.env.GOOGLE_NATURAL_LANGUAGE_API_KEY



const lookup = async(word) => {

  try {
    const thesaurus = await axios.get(`http://words.bighugelabs.com/api/2/${API_KEY}/${word}/json`);
    return thesaurus.data;
  }
  catch (err){
    console.error('error from bighugelabs api: ', err.response.status, err.response.statusText);

    if (err.response.status === 500 && err.response.statusText === 'Usage Exceeded'){
        console.log('FIRST API KEY IS EXPIRED')
      try {
        const backupThesaurus = await axios.get(`http://words.bighugelabs.com/api/2/${API_KEY_BACKUP}/${word}/json`)
        return backupThesaurus.data
      }
      catch (secondErr){
        console.error('both our api keys are expired...', secondErr)
        return undefined;
      }
    }
    return undefined
  }
}

const getRandomIndex = (arr) => {
  const end = arr.length
  return Math.floor(Math.random() * Math.floor(end));
}

const getRandomWords = async(word, num) => {
  try {
    const response = await axios.get(`http://api.datamuse.com/words?rel_trg=${word}`);
    const objArray = response.data;


    const firstIndex = getRandomIndex(objArray.slice(0));
    const secondIndex = getRandomIndex(objArray.slice(0));
    const firstWord = objArray[firstIndex].word || '';
    const secondWord = objArray[secondIndex].word || '';
    const thirdIndex = getRandomIndex(objArray.slice(0));
    const thirdWord = objArray[thirdIndex].word;
    return [firstWord, secondWord, thirdWord];
  }
  catch (err){
    return undefined
  }
}

const shuffle = (originalArray) =>{
  var array = [].concat(originalArray);
  var currentIndex = array.length, temporaryValue, randomIndex;


  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

const findSentiment = async(text)=> {
  try{
    const sentiment = await axios.post(`https://language.googleapis.com/v1/documents:analyzeSentiment?key=${GOOGLE_NAT_LANG_API_KEY}`, text)
  return sentiment
  }
  catch (err){
    console.log(err)
  }
}



const findEntities = async (quoteStr) => {
  try{
    const entities = await axios.post(`https://language.googleapis.com/v1/documents:analyzeEntities?key=${GOOGLE_NAT_LANG_API_KEY}`, quoteStr)

    return entities
  }
  catch (err){
    console.log(err)
  }
}

module.exports = {lookup, getRandomIndex, getRandomWords, shuffle, findSentiment, findEntities}
