const router = require('express').Router();
const { findSentiment, findPeople, findPlaces, findQuotations } = require('./quoteUtils');


module.exports = router;

router.post('/quoteQuestion', (req, res, next) => {
  const text = `He didn't look at it, but after a moment he spoke to it. "How did you know it was me?" she asked. Some sentence in between. "You aren't ever!"
  "You'd be stiff if you'd been sitting on a brick wall all day," said Professor McGonagall, Courtney Napleton, David Duke.`
//   const quote = req.body
//   let quoteStr = ''
//   let quoteMarkCount = 0
//   for (let i = 0; i<text.length; i++){
//     if(text[i] === '"'){
//       quoteMarkCount++
//       let j = i;
//       if(quoteMarkCount%2){
//       while(text[j-1] !== '.'){
//         quoteStr += text[j]
//         j++
//       }
//     }
//   }
// }
const quotations = findQuotations(text)
console.log('string of quotes:', quotations)
// // const objToSend = {
//       "encodingType": "UTF8",
//       "document": {
//         "type": "PLAIN_TEXT",
//         "content": "How did you know it was me?' she asked.'You aren't ever!' 'You'd be stiff if you'd been sitting on a brick wall all day,' said Professor McGonagall.'You'd be stiff if you'd been sitting on a brick wall all day,' said Professor McGonagall."
//       }

  //parse text for quotes, include through .
  //send JSON obj to post to findSentiment and findEntity with sentences as one long block of text
  //choose 5-10 emotional quotes, make an array of whole sentences
  //for each sentence, if  strings after quotation marks contain a PERSON from findEntity, make that into a 'Who said ________?' question
  //send to questions to frontend
 
    // const sentimentresult = await findSentiment(quoteStr)
    const peopleResult = findPeople(text)
    const placesResult = findPlaces(text)
    console.log(placesResult)
    // res.send(entityresult)
    res.send(quotations)
    // res.send(sentimentresult.data)
  

})

// send from frontend: {
//   "encodingType": "UTF8",
//   "document": {
//     "type": "PLAIN_TEXT",
//     "content": "so many many many words all in a chapter"
//   }
// }
