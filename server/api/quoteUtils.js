const axios = require('axios');
const GOOGLE_NAT_LANG_API_KEY = process.env.GOOGLE_NATURAL_LANGUAGE_API_KEY
const nlp = require('compromise')
const language = require('@google-cloud/language')
const client = new language.LanguageServiceClient();
const { shuffle } = require('./utils')
const AYLIENTextAPI = require('aylien_textapi');

const textapi = new AYLIENTextAPI({
  application_id: process.env.SUMMARY_ID,
  application_key: process.env.SUMMARY_KEY
});

const findSummary = async (text) => {
  const parameters = {
    text: `${text}`,
    title: 'Summary',
    sentences_number: 5
  }

  function summaryAsync(param) {
    return new Promise(function (resolve, reject) {
      textapi.summarize(param, function (error, response) {
        if (error) return reject(error);
        resolve(response);
      })
    })
  }
  try {
    if(text.length){
    const summary = await summaryAsync(parameters)
    return summary.sentences
    }
  }
  catch (err) {
    console.log('ERROR:', err)
  }
}



function quoteQuestions(txt, quote, people) {
  var sendQuoteObj = {}
  const lowQuote = quote.toLowerCase()
  const lowTxt = txt.toLowerCase()
  const qLength = quote.length
  const startIndex = lowTxt.indexOf(lowQuote) + qLength + 1
  let residue = ''
  let wrongAnswers;

  for (let i = startIndex; i < lowTxt.length; i++) {
    if (lowTxt[i - 1] === ".") {
      if (lowTxt[i - 4] !== 'm' && lowTxt[i - 3] !== 'm') {
        break;
      }
    }
    residue += lowTxt[i]
  }

  const normalized = residue.replace(/\./g, '')
  const peopleFiltered = people.filter(item => {
    return normalized.includes(item.name.toLowerCase())
  })

  if (peopleFiltered.length === 1) {
    let question = `Who said, ` + quote.slice(0, -2) + `"?`
    let rightAnswer = peopleFiltered[0]
    sendQuoteObj.question = question
    sendQuoteObj.rightAnswer = rightAnswer.name
  }
  if (peopleFiltered.length === 1) {
    wrongAnswers = people.map(personObj => {
      return personObj.name
    }).filter(person => {
      return person !== sendQuoteObj.rightAnswer
    })
  }
  let namesOnly = []
  if (wrongAnswers) {
    for (let i = 0; i < wrongAnswers.length; i++) {
      if (wrongAnswers[i].charCodeAt(0) < 97) {
        namesOnly.push(wrongAnswers[i])
      }
    }

    let wrongArr = namesOnly.slice(0, 3)
    wrongArr.push(sendQuoteObj.rightAnswer)
    let answers = shuffle(wrongArr)
    sendQuoteObj.answers = answers
  }

  return sendQuoteObj

}

const findSentiment = async (text) => {
  try {
    const sentiment = await axios.post(`https://language.googleapis.com/v1/documents:analyzeSentiment?key=${GOOGLE_NAT_LANG_API_KEY}`, text)
    return sentiment
  }
  catch (err) {
    console.log(err)
  }
}
const namesInSentences = async (peopleObjArr, sentenceArr) => {
  try {
    let namesOnlyArr = []
    let sentenceObjArr = []
    let noRepeats = []
    for (let i = 0; i < peopleObjArr.length; i++) {
      if (peopleObjArr[i].name.charCodeAt(0) < 97) {
        namesOnlyArr.push(peopleObjArr[i].name)
      }
    }
    const filteredSentences = sentenceArr.filter(sentence => {
      return sentence.length < 300 && sentence.charCodeAt(0) < 97 && ((sentence.indexOf('.') > 32) || (sentence.indexOf('!') > 32) || (sentence.indexOf('?') > 32) || (sentence.indexOf(',') > 32))
    })

    for (let i = 0; i < filteredSentences.length; i++) {
      for (let j = 0; j < namesOnlyArr.length; j++) {
        if (filteredSentences[i].includes(namesOnlyArr[j]) && !noRepeats.includes(filteredSentences[i])) {
          noRepeats.push(filteredSentences[i])
          sentenceObjArr.push({
            sentence: filteredSentences[i],
            name: namesOnlyArr[j],
            answers: ['true', 'false']
          })
        }
      }
    }
    console.log('SOA', sentenceObjArr)
    const question = await makeTrueFalse(sentenceObjArr, namesOnlyArr)
    return question
  }
  catch (err) {
    console.log(err)
  }
}
const findPeople = async (text) => {

  const document = {
    content: text,
    type: 'PLAIN_TEXT',
  };
  try {
    const entities = await client
      .analyzeEntities({ document: document })
    const cleanEntities = entities[0].entities.map(entity => {
      let obj = {
        name: entity.name,
        Type: entity.type,
        mentions: entity.mentions.length,
        salience: entity.salience
      }
      return obj
    }).filter(obj => {
      return obj.Type === "PERSON"
    })
    return cleanEntities

  }
  catch (err) {
    console.error('ERROR:', err);
  }
}
const findSyntax = async (text) => {

  const document = {
    content: text,
    type: 'PLAIN_TEXT',
  };
  try {
    const doc = nlp(text)
    const sentences = doc.sentences()
    return sentences.data()

  }
  catch (err) {
    console.error('ERROR:', err);
  }
}

const makeTrueFalse = (sentenceObjArr, namesOnlyArr) => {
  let finalQ = sentenceObjArr.map(obj => {
    if (obj.name === ('Mrs.' || 'Mr.' || 'Miss' || 'Dr.' || 'Ms.' || 'Professor')) {

      let newSentence = obj.sentence.replace(/\n/g, ' ').replace(/\s+/g, ' ').trim()
      let wordtoken = newSentence.split(' ')
      let wordTokenIdx = wordtoken.indexOf(obj.name) + 1
      let newName = wordtoken[wordTokenIdx]
      obj.sentence = newSentence
      obj.name = (obj.name + ' ' + newName)
    } return obj
  })
  let count = 0
  let question = sentenceObjArr.map(obj2 => {
    count++
    if (!count % 2) {
      obj2.question = 'True or False? ' + obj2.sentence
      obj2.rightAnswer = 'true'
    } else {
      let startIdx = obj2.sentence.indexOf(obj2.name)
      let endIdx = obj2.name.length + startIdx
      let tempSentence = obj2.sentence.slice(0, startIdx) + obj2.sentence.slice(endIdx)
      let shuffledAnswers = shuffle(namesOnlyArr)
      let idx = 0
      if (shuffledAnswers[idx] !== obj2.name) {
        let falsyName = shuffledAnswers[idx]
        let tempSentence = obj2.sentence.slice(0, startIdx) + falsyName + obj2.sentence.slice(endIdx)
        obj2.question = 'True or False? ' + tempSentence


        obj2.rightAnswer = 'false'
      } else if (shuffledAnswers[idx] === obj2.name){
        obj2.question = 'True or False? ' + obj2.sentence
        obj2.rightAnswer = 'true'
      }
    }
    delete obj2.sentence
    delete obj2.name
    return obj2
  })
  return question
}


const findPlaces = (quoteStr) => {
  const doc = nlp(quoteStr)
  const places = doc.places()
  places.sort('alpha')
  const placesArr = places.out('array')
  return placesArr
}
const findSubjVerb = async (text) => {
  try {
    const doc = nlp(text)
    const person = doc.match('#Person #Verb')

    const pronoun = doc.match('#Pronoun #Verb')
    const newPronoun = pronoun.data()
    const newPerson = person.data()

    const goodNouns = newPerson.map(personage => {
      if (newPronoun.includes(personage)) {
        return null
      } return personage
    })

    return goodNouns

  }
  catch (err) {
    console.error('ERROR:', err);
  }

}

const findQuotations = (quoteStr) => {

  const doc = nlp(quoteStr)
  const quotations = doc.quotations()
  return quotations.data()
}


module.exports = { findSentiment, findPlaces, findPeople, findQuotations, quoteQuestions, findSyntax, findSubjVerb, namesInSentences, findSummary, makeTrueFalse }
