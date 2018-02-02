const axios = require('axios');
const GOOGLE_NAT_LANG_API_KEY = process.env.GOOGLE_NATURAL_LANGUAGE_API_KEY
const nlp = require('compromise')
const language = require('@google-cloud/language')
const client = new language.LanguageServiceClient();
const { shuffle } = require('./utils')



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
    let question = `Who said, ` + quote + `?`
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
      console.log(wrongAnswers[i])
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

const findPlaces = (quoteStr) => {
  const doc = nlp(quoteStr)
  const places = doc.places()
  places.sort('alpha')
  const placesArr = places.out('array')
  return placesArr
}

const findQuotations = (quoteStr) => {

  const doc = nlp(quoteStr)
  const quotations = doc.quotations()
  return quotations.data()
}

module.exports = { findSentiment, findPlaces, findPeople, findQuotations, quoteQuestions }
