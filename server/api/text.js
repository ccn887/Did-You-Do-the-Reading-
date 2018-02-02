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
        const synonym = synAntArray[0];
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
