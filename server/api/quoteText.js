const router = require('express').Router();
const { findPeople, findPlaces, findQuotations, quoteQuestions } = require('./quoteUtils');


module.exports = router;

router.post('/quoteQuestion', (req, res, next) => {
 
  const text = `He didn't look at it, but after a moment he spoke to it. "How did you know it was me?" Courtney Napleton asked. Some sentence in between. "You aren't ever!"
  "You'd be stiff if you'd been sitting on a brick wall all day," said Professor McGonagall, Courtney Napleton, Harold Potter.` 
const quotations = findQuotations(text)
    const peopleResult = findPeople(text)
    const placesResult = findPlaces(text)
    const question = quotations.map(quote => {
      return quoteQuestions(text,  quote.text, peopleResult )
    })
    res.send(question)

})

