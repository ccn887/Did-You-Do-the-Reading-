const router = require('express').Router();
const { findPeople, findPlaces, findQuotations, quoteQuestions, findSyntax, findSimiles, findSubjVerb } = require('./quoteUtils');


module.exports = router;
let peopleResult;
router.post('/quoteQuestion', async (req, res, next) => {

  const text = req.body.content


  try {
    const quotations = await findQuotations(text)
    const longQuotesOnlyArr = quotations.map(quote => {
      let newArr = quote.text.split(' ')
      return newArr
    }).filter(arr => {
      return arr.length > 5
    })
    const finalQuotes = longQuotesOnlyArr.map(quoteArr => {
      return quoteArr.join(' ')
    })
    peopleResult = await findPeople(text)

    const question = finalQuotes.map(quote => {
      return quoteQuestions(text, quote, peopleResult)
    })
    const newQuestion = question.filter(question => {
      return question.hasOwnProperty('question')
    })
    res.send(newQuestion)
  }
  catch (err) {
    console.log(err)
  }


})

router.post('/whoDidItQuestion', async (req, res, next) => {

  const text = req.body.text


  try {
    //would work well for a trivia-style fill-in-the-blank question on character or setting.
    const syntaxResult = await findSyntax(text)
    let sentenceArr = []
    let namesOnly = []
    const peopleResult = await findPeople(text)
    for (let i = 0; i < peopleResult.length; i++) {
      if (peopleResult[i].name.charCodeAt(0) < 97) {
        namesOnly.push(peopleResult[i].name.toLowerCase())
      }
    }


    let sentencesArr = []
    const subjVerb = await findSubjVerb(text)
    const subjVerbArr = subjVerb.map(obj => {
      return obj.text
    })
    for (let i = 0; i < syntaxResult.length; i++) {
      for (let j = 0; j < subjVerb.length; j++) {
        if (syntaxResult[i].text.includes(subjVerb[j].text)) {
          sentencesArr.push(syntaxResult[i].text)
          break;
        }
      }
    }
    const filteredSentences = sentencesArr.filter(sentence => {
      return sentence.length > 55 && sentence.charCodeAt(0) < 97
    })

    let sentenceObjArr = []
    for (let i = 0; i < filteredSentences.length; i++) {
      for (let j = 0; j < subjVerbArr.length; j++) {
        if (filteredSentences[i].includes(subjVerbArr[j])) {
          sentenceObjArr.push({
            sentence: filteredSentences[i],
            subjectVerb: subjVerbArr[j]
          })
        }
      }
    }


    let newQuestion = []
    const question = sentenceObjArr.map(obj => {
      let startLetter = obj.subjectVerb[0]
      const startIdx = obj.sentence.indexOf(startLetter)
      const endIdx = startIdx + obj.subjectVerb.length
      let finalPart = obj.sentence.slice(endIdx)
      let verbArr = obj.subjectVerb.trim().split(' ')
      let verb = verbArr[1]

      obj.question = `Who ` + finalPart.trim() + `?`
      if (!newQuestion.includes(obj.question)) {
        newQuestion.push(obj.question)
        return obj
      }
      return null
    })

    const rightAnswerArr = sentenceObjArr.map(obj => {
      let arr = obj.subjectVerb.trim().split(' ')
      obj.rightAnswer = arr[0].replace(/\W/g, ' ').trim()
      obj.verb = arr[1]
      return obj
    })
    const wrongAnswerArr = rightAnswerArr.map(obj => {
      let wrongs = namesOnly.filter(name => {
        let righty = obj.rightAnswer.toLowerCase()
        return name !== righty && !name.includes(righty)
      })
      obj.answers = wrongs.slice(0, 3).concat(obj.rightAnswer)
      return obj
    })
    res.send(wrongAnswerArr)
  }
  catch (err) {
    console.log(err)
  }


})

router.post('/simileQuestion', async (req, res, next) => {

  const text = req.body.text


  try {

    const similes = await findSimiles(text)
    //Good for fill-in-the-blanks until the end of the clause
    res.send(similes)
  }
  catch (err) {
    console.log(err)
  }


})

// router.post('/modifierQuestion', async (req, res, next) => {




//   try {

//     const modifiers = await findSyntax(text)

//     res.send(peopleResult)
//   }
//   catch (err) {
//     console.log(err)
//   }


// })



