const router = require('express').Router();
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const { WordList } = require('../db/models');
const { lookup, getRandomIndex, getRandomWords, shuffle, pullFromDb } = require('./utils');


module.exports = router;

router.post('/vocab', async (req, res, next) => {
  const textArray = req.body;

  const notAllowedWords = ['jew', 'jews', 'nazi', 'jackass', 'shit', 'faggot', 'balls']

  try {
    const response = await WordList.findAll({
      where: {
        word: {
          [Op.or]: textArray
        }
      }
    });

    const vocabWords = response.map(entry => {
      return entry.word
    })

    if (vocabWords.length >= 30) {
      vocabWords.splice(0, 30)
    }

    const questions = await Promise.all(vocabWords.map(async word => {
      const questionObject = {};

      const synAntArray = await lookup(word);
      if (synAntArray && synAntArray.length) {

        const synonym = synAntArray[0];

        const firstRandomWords = await getRandomWords(word);

        if (firstRandomWords){
          const randomWords = firstRandomWords.map(randWord => {
            if (notAllowedWords.includes(randWord)){
              return pullFromDb();
            }
            else {
              return randWord;
            }
          })

          questionObject.question = `Which word means ${word}?`;

          questionObject.rightAnswer = synonym;

          if (!synAntArray[1]) {
            questionObject.answers = shuffle([randomWords[0], randomWords[1], randomWords[2], synonym]);
          } else {
            const antonym = synAntArray[1];
            questionObject.answers = shuffle([antonym, randomWords[0], randomWords[1], synonym]);
          }


            //nice-to-haves
            /*
            - randomize which part of speech it uses
            - OR add part of speech to consideration
            */
            // console.log('backend last', questionObject);
          }
        }
      return questionObject;
    }));
    res.json(questions);
  }
  catch (error) {
    next(error)
  }
})
