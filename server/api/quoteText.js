const router = require('express').Router();
const { findPeople, findPlaces, findQuotations, quoteQuestions } = require('./quoteUtils');


module.exports = router;

router.post('/quoteQuestion', async (req, res, next) => {

  const text = req.body.content
console.log('TEXT RECEIVED', text)


try{

const quotations = await findQuotations(text)
    const peopleResult = await findPeople(text)
console.log('ARETHEYINPORDER', quotations)
    const placesResult = findPlaces(text)
    const question = quotations.map(quote => {
      return quoteQuestions(text,  quote.text, peopleResult )
    })
    const newQuestion = question.filter(question => {
      return question.hasOwnProperty('question')
    })
    res.send(newQuestion)
}
catch(err){
  console.log(err)
}


})

