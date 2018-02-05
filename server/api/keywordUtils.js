const nlp = require('compromise')
const { findSyntax } = require('./quoteUtils')
const { shuffle } = require('./utils')
const datamuse = require('datamuse');


const findNonPeopleKeywords = async (text, fullText) => {

  try {
   let nonPersonArr = text.keywords.filter(obj => {
    let doc = nlp(obj.text)
    let person = doc.match('#Person')
    let realPerson = person.data()

    if(!realPerson.length){
      return obj
    }
   })


  // const place = doc.match('#Place')
    const questionObj = await makeQuestionObj(nonPersonArr, fullText)
    return questionObj
  }
  catch (err) {
    console.error('ERROR:', err);
  }
}

const makeQuestionObj =  async (arr, text) => {
  try {
    const sentences = await findSyntax(text)
    const filteredSentences = sentences.filter(sentence => {
      return sentence.text.length > 40 && sentence.text.charCodeAt(0) < 97 && ((sentence.text.slice(-7, -1).includes('.')) ||
      (sentence.text.slice(-7, -1).includes('!')) ||
      (sentence.text.slice(-7, -1).includes('?')))
    })


    let sentenceObjArr = []
    for (let i = 0; i < filteredSentences.length; i++) {
      for (let j = 0; j < arr.length; j++) {
        if (filteredSentences[i].text.includes(arr[j].text)) {
          let questionStartIdx  = filteredSentences[i].text.indexOf(arr[j].text)
          let endIdx = arr[j].text.length + questionStartIdx
          let question = filteredSentences[i].text.slice(0, questionStartIdx) + '_____________' + filteredSentences[i].text.slice(endIdx)
          sentenceObjArr.push({
            question: question,
            rightAnswer: arr[j].text
          })
        }
      }
    }
    let wrongAnswers = makeWrongAnswers(sentenceObjArr)

    return wrongAnswers
  }
  catch (err) {
    console.error('ERROR:', err);
  }
}

const makeWrongAnswers = async (obj) => {
  const text = 'sweater'
  try{
   const similar = await datamuse.words({
      ml: `${text}`
    })
    .then((json) => {
      console.log('DATA?', json);
      return obj
    });
  }
  catch (err) {
    console.error('ERROR:', err);
  }
}

module.exports = { findNonPeopleKeywords }
