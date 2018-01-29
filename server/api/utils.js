const axios = require('axios');

// REVIEW: DANGER DANGER DANGER
const API_KEY = '3bdcf6b9dc86fe668496d790bf084049';




const lookup = async(word) => {
  try{
  const thesaurus = await axios.get(`http://words.bighugelabs.com/api/2/${API_KEY}/${word}/json`);
  if (thesaurus.data.Error){
    return undefined
  }
  return thesaurus.data;
  }
  catch (err){
    return undefined
  }
}

const getRandomIndex = (arr) => {
  const end = arr.length
  return Math.floor(Math.random() * Math.floor(end));
}

const getRandomWords = async(word, num) => {
  const response = await axios.get(`http://api.datamuse.com/words?rel_trg=${word}`);
  const objArray = response.data;
  const firstIndex = getRandomIndex(objArray.slice(0));
  const secondIndex = getRandomIndex(objArray.slice(0));
  const firstWord = objArray[firstIndex].word;
  const secondWord = objArray[secondIndex].word;
  const thirdIndex = getRandomIndex(objArray.slice(0));
  const thirdWord = objArray[thirdIndex].word;
  return [firstWord, secondWord, thirdWord];
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


module.exports = {lookup, getRandomIndex, getRandomWords, shuffle}
