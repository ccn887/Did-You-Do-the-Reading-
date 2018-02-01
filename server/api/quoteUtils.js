

const axios = require('axios');
const GOOGLE_NAT_LANG_API_KEY = process.env.GOOGLE_NATURAL_LANGUAGE_API_KEY
const nlp = require('compromise')


function quoteQuestions( txt, quote, people){
var sendQuoteObj = {}
    const lowQuote = quote.toLowerCase()
    const lowTxt = txt.toLowerCase()
  const qLength = quote.length
  const startIndex = lowTxt.indexOf(lowQuote)+qLength+1
  let residue = ''
  
  for (let i = startIndex; i < lowTxt.length; i++){
    
    if(lowTxt[i-1] === "."){
    break;
    }
    residue += lowTxt[i]
  }
  const peopleFiltered = people.filter(item => {
    return residue.includes(item)
  })
  if (peopleFiltered.length === 1){
    let question = `Who said, "` + quote + `"?`
    let rightAnswer = peopleFiltered[0]
    sendQuoteObj.question = question
    sendQuoteObj.rightAnswer = rightAnswer
  }
  return sendQuoteObj
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


const findPeople = (quoteStr) => {
    const doc = nlp(quoteStr)
    const people = doc.people()
    people.normalize().sort('frequency').unique()
    const peopleArr =  people.out('array')
    return peopleArr
    }

    const findPlaces = (quoteStr) => {
        const doc = nlp(quoteStr)
      const places = doc.places()
      places.sort('alpha')
     const placesArr =  places.out('array')
     return placesArr
  }

  const findQuotations = (quoteStr) => {
    const doc = nlp(quoteStr)
    const quotations = doc.quotations()
    return quotations.data()
  }

module.exports = {findSentiment, findPlaces, findPeople, findQuotations, quoteQuestions}
