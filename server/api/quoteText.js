const router = require('express').Router();
const { findSentiment, findPeople, findPlaces, findQuotations, quoteQuestions } = require('./quoteUtils');


module.exports = router;

router.post('/quoteQuestion', (req, res, next) => {
 
  const text = `He didn't look at it, but after a moment he spoke to it. "How did you know it was me?" Courtney Napleton asked. Some sentence in between. "You aren't ever!"
  "You'd be stiff if you'd been sitting on a brick wall all day," said Professor McGonagall, Courtney Napleton, Harold Potter.` 
// const quotations = findQuotations(text)
const peopleArr = ["Jake", "Courtney Napleton", "Professor McGonagall" ]
// console.log('string of quotes:', quotations)
const question = quoteQuestions(text, "How did you know it was me?", peopleArr )

    // const peopleResult = findPeople(text)
    // const placesResult = findPlaces(text)
    // console.log(placesResult)
    // res.send(entityresult)
    // console.log(question)
    res.send(question)

})


//found quotes, use string.match to find the  ten longest quotes in text, if exist.  
// see if ONE recognized persos in portion of proximate text.
//if so, who said aforementioned quote, wrong answers are other entities found.  right answer is person found in proximal result.


