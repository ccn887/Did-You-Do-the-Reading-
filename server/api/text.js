const router = require('express').Router();
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const { WordList } = require('../db/models');

const { lookup, getRandomIndex, getRandomWords, shuffle, pullFromDb } = require('./utils');



module.exports = router;

router.post('/vocab', async (req, res, next) => {
  const textArray = req.body;

  const notAllowedWords = ['jew', 'jews', 'nazi', 'jackass', 'shit', 'faggot', 'balls', 'jesus']

  try {
    const response = await WordList.findAll({
      where: {
        word: {
          [Op.or]: textArray
        }
      }
    });

    const vocabWords = response.map(entry => {
      return {word: entry.word, partOfSpeech: entry.partOfSpeech}
    })

    if (vocabWords.length >= 30) {
      vocabWords.splice(0, 30)
    }

    const questions = await Promise.all(vocabWords.map(async wordObj => {
      const questionObject = {};

      const synAntArray = await lookup(wordObj);
      if (synAntArray && synAntArray.length) {
        console.log('synonym and antonym array: ', synAntArray)
        const synonym = synAntArray[0];
        console.log('synonym fro api:', synonym)
        const firstRandomWords = await getRandomWords(wordObj.word);


        if (firstRandomWords){
          const randomWords = firstRandomWords.map(randWord => {
            if (notAllowedWords.includes(randWord)){
              return pullFromDb();
            }
            else {
              return randWord;
            }
          })

          questionObject.question = `Which word means ${wordObj.word}?`;

          questionObject.rightAnswer = synonym;

          if (!synAntArray[1]) {
            questionObject.answers = shuffle([randomWords[0], randomWords[1], randomWords[2], synonym]);
          } else {
            const antonym = synAntArray[1];
            questionObject.answers = shuffle([antonym, randomWords[0], randomWords[1], synonym]);
          }


          const randomWords = await getRandomWords(word);
          if (randomWords) {
            questionObject.question = `Which word means ${word}?`;
            questionObject.rightAnswer = synonym;

            if (!antonym.length) {
              questionObject.answers = [randomWords[0], randomWords[1], randomWords[2], synonym];
            } else {
              questionObject.answers = shuffle([antonym, randomWords[0], randomWords[1], synonym]);

          if (randomWords.includes(wordObj.word)){
            const replaceIdx = randomWords.indexOf(wordObj.word)
            const replacementWord = await pullFromDb();
            randomWords.splice(replaceIdx, 1, replacementWord);
          }


          if (randomWords.includes(synonym)){
            const replaceIdx = randomWords.indexOf(synonym)
            const replacementWord = await pullFromDb();
            randomWords.splice(replaceIdx, 1, replacementWord);
          }

          return questionObject;
        }
      }
    }));
    res.json(questions);
  }
  catch (error) {
    next(error)
  }
})

router.post('/sentiment', async (req, res, next) => {
  const text = `He didn't look at it, but after a moment he spoke to it. Ho"w did you know it was me?" she asked. Some sentence in between. "You aren't ever!"
  "You'd be stiff if you'd been sitting on a brick wall all day," said Professor McGonagall.`
  const quote = req.body
  let quoteStr = ''
  let quoteMarkCount = 0
  for (let i = 0; i<text.length; i++){
    if(text[i] === '"'){
      quoteMarkCount++
      let j = i;
      if(quoteMarkCount%2){
      while(text[j-1] !== '.'){
        quoteStr += text[j]
        j++
      }
    }
  }
}
console.log('string of quotes:', quoteStr)
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
  try {
    const sentimentresult = await findSentiment(quote)
    const entityresult = await findEntities(quote)
    // res.send(entityresult.data)
    res.send(sentimentresult.data)
    // res.send(sentimentresult.data)
    res.sendStatus(200)
  }
  catch (error) {
    console.log(error)
  }
})

// send from frontend: {
//   "encodingType": "UTF8",
//   "document": {
//     "type": "PLAIN_TEXT",
//     "content": "so many many many words all in a chapter"
//   }
// }
