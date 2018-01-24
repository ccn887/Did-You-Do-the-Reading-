const router = require('express').Router();
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const {WordList} = require('../db/models');
const {lookup} = require('./utils');

const API_KEY = '3bdcf6b9dc86fe668496d790bf084049';

module.exports = router;

router.post('/vocab', async (req, res, next)=> {
  const textArray = req.body;

  try {
    const response = await WordList.findAll({
      where: {
        word:{
          [Op.or]: textArray
        }
      }
    });

    const vocabWords = response.map(entry => {
      return entry.word
    })

    const questions = await Promise.all(vocabWords.map(async word => {
      // hit word API
      // get one synonym and two antonyms
      const questionObject = {};
      const thesaurusInfo = await lookup(word);
      console.log(questionObject.info);
      // this is currently hard-coding to the first part of speech
      const partOfSpeech = Object.keys(thesaurusInfo)[0];
      const synonym = thesaurusInfo[partOfSpeech].syn
        ? thesaurusInfo[partOfSpeech].syn[0]
        : '';
      const antonym = thesaurusInfo[partOfSpeech].ant
        ? thesaurusInfo[partOfSpeech].ant[0]
        : '';
      const randomOne = '';
      const randomTwo = '';
      questionObject.info = thesaurusInfo;
      questionObject.question = `What word means ${word}?`;
      questionObject.rightAnswer = synonym;
      questionObject.wrongAnswers = [antonym, randomOne, randomTwo]
      //TODO:
      /*
      - generate two random words for wrongAnsers
      - generate a third random word if no antonyms
      - randomize which part of speech it uses
      */
      return questionObject;
    }))

    res.json(questions);
  }
  catch (error) {
    next(error)
  }
})
