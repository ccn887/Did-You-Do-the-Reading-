const axios = require('axios');
const Sequelize = require('sequelize');
const { WordList } = require('../db/models');

const API_KEY = process.env.WORDS_API_KEY;
const API_KEY_BACKUP = process.env.BACKUP_WORDS_API_KEY;


const getRandomIndex = (arr) => {
  const end = arr.length
  return Math.floor(Math.random() * Math.floor(end));
}


const parseThesaurusData = (thesaurusInfo, wordObj) => {
  if (thesaurusInfo){
    let word = wordObj.word;

    let partOfSpeech;
    if (wordObj.partOfSpeech === 'none'){
      partOfSpeech = Object.keys(thesaurusInfo)[0];
    }
    else {
      partOfSpeech = wordObj.partOfSpeech;
    }

    if (thesaurusInfo[partOfSpeech].syn) {
      let synIndex = getRandomIndex(thesaurusInfo[partOfSpeech].syn)

      let synonym = thesaurusInfo[partOfSpeech].syn[synIndex].toLowerCase();

      if (word.includes(synonym) || synonym.includes(word)){
        if (thesaurusInfo[partOfSpeech].syn.length > 1){
          synonym = thesaurusInfo[partOfSpeech].syn[(synIndex + 2) % thesaurusInfo[partOfSpeech].syn.length]
        }
      }

      let antonym;

      if (thesaurusInfo[partOfSpeech].ant) {
        const antIndex = getRandomIndex(thesaurusInfo[partOfSpeech].ant);
        antonym = thesaurusInfo[partOfSpeech].ant[antIndex].toLowerCase();
      }

      if (synonym){
        if(antonym){
          return [synonym, antonym];
        }
        return [synonym]
      }
    }
    else {
      return [];
    }
  }
}


const lookup = async(wordObj) => {
  try {
    const thesaurus = await axios.get(`http://words.bighugelabs.com/api/2/${API_KEY}/${wordObj.word}/json`);
    return parseThesaurusData(thesaurus.data, wordObj);

  }
  catch (err){
    console.error('error from bighugelabs api: ', err.response.status, err.response.statusText);

    if (err.response.status === 500 && err.response.statusText === 'Usage Exceeded'){
        console.log('FIRST API KEY IS EXPIRED')
      try {
        const backupThesaurus = await axios.get(`http://words.bighugelabs.com/api/2/${API_KEY_BACKUP}/${word}/json`)
        return parseThesaurusData(backupThesaurus.data, wordObj)
      }
      catch (secondErr){
        console.error('both our api keys are expired...', secondErr)
        return undefined;
      }
    }
    return undefined
  }
}


const pullFromDb = async() => {
  const id = Math.floor(Math.random() * Math.floor(5000))
  const newWord = await WordList.findById(id);
  return newWord.word;
}


const getRandomWords = async(word, num) => {
  try {
    const response = await axios.get(`http://api.datamuse.com/words?rel_trg=${word}`);
    const objArray = response.data;

    const firstIndex = getRandomIndex(objArray.slice(0));
    const firstWord = objArray[firstIndex].word.toLowerCase() || '';

    const secondIndex = getRandomIndex(objArray.slice(0));
    let secondWord = objArray[secondIndex].word.toLowerCase() || '';

    if (secondWord === firstWord){
      secondWord = await pullFromDb();
    }

    const thirdIndex = getRandomIndex(objArray.slice(0));
    let thirdWord = objArray[thirdIndex].word.toLowerCase() || '';

    if (thirdWord === firstWord || thirdWord === secondWord){
      thirdWord = await pullFromDb();
    }
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



//
// const replaceDuplicates = (arr) => {
//   console.log('ARRAY BEING SEARCHED', arr)
//   arr.forEach( (word, index) => {
//     arr.forEach((secondWord, secondIndex) => {
//       if (word === secondWord && index !== secondIndex) {
//         secondWord = pullFromDb();
//       }
//     })
//   });
//   console.log('ARRAY BEFORE RETURNING', arr)
//   return arr;
// }


module.exports = {lookup, getRandomIndex, getRandomWords, shuffle, pullFromDb }
