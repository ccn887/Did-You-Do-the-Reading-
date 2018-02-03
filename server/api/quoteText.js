const router = require('express').Router();
const { findPeople, findPlaces, findQuotations, quoteQuestions } = require('./quoteUtils');


module.exports = router;

router.post('/quoteQuestion', async (req, res, next) => {

  const text = req.body.content


try{
const quotations = await findQuotations(text)
const longQuotesOnlyArr = quotations.map(quote =>{
  let newArr = quote.text.split(' ')
  return newArr
}).filter(arr => {
return arr.length > 7 })
const finalQuotes = longQuotesOnlyArr.map(quoteArr => {
  return quoteArr.join(' ')
})
    const peopleResult = await findPeople(text)
    const placesResult = findPlaces(text)
    console.log('PLACES', placesResult)
    const question = finalQuotes.map(quote => {
      return quoteQuestions(text, quote, peopleResult )
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

