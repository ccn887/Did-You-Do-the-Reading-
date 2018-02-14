const router = require('express').Router();
const { findPeople, findPlaces, findQuotations, quoteQuestions, findSyntax, findSimiles, findSubjVerb } = require('./quoteUtils');
const {shuffle} = require('./utils')


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
    res.send([])
  }


})

router.post('/whoDidItQuestion', async (req, res, next) => {

  const text = req.body.content
  try {
    //would work well for a trivia-style fill-in-the-blank question on character or setting.
    const syntaxResult = await findSyntax(text)
    console.log('SYNTAXRES', syntaxResult)

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
      return sentence.length > 40 && sentence.charCodeAt(0) < 97 && ((sentence.slice(-7).includes('.')) ||
      (sentence.slice(-7).includes('!')) ||
      (sentence.slice(-7).includes('?')) ||
      (sentence.slice(-7).includes(',')))
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
      let startLetter = obj.subjectVerb
      const startIdx = obj.sentence.indexOf(startLetter)
      const endIdx = startIdx + obj.subjectVerb.length
      let finalPart = obj.sentence.slice(endIdx)
      let verbArr = obj.subjectVerb.trim().split(' ')
      let verb = verbArr[1]

      if(startIdx === 0){
      obj.question = `Who ` + verb + ' ' + finalPart.trim().slice(0,-1) + `?`
      if (!newQuestion.includes(obj.question)) {
        newQuestion.push(obj.question)
        return obj
      }
    }
      return null
    })


    const rightAnswerArr = sentenceObjArr.map(obj => {
      if(obj.question){
      let arr = obj.subjectVerb.trim().split(' ')
      obj.rightAnswer = arr[0].replace(/\W/g, ' ').trim()
      obj.verb = arr[1]
      return obj
      } else return obj
    })

    const wrongAnswerArr = rightAnswerArr.map(obj => {
      let wrongs = namesOnly.filter(name => {
        if(obj.rightAnswer){
        let righty = obj.rightAnswer.toLowerCase()
        return name !== righty && !name.includes(righty)
        } else return obj
      })


      obj.rightAnswer ? (obj.answers = wrongs.slice(0, 3).concat(obj.rightAnswer)) : obj.answers = null

      obj.answers ? (obj.answers = obj.answers.map(name => {

       let n = name.trim()

       let newName = n[0].toUpperCase() + n.slice(1)
        return newName
      })) : obj.answers = null

      obj.answers ? (obj.answers = shuffle(obj.answers)): obj.answers = null
      return obj
    })

    const finalQuestionObj = wrongAnswerArr.filter(obj =>{
      return obj.question
    }).map(obj =>{
      delete obj.verb;
      delete obj.subjectVerb;
      delete obj.sentence
      return obj
    })
    res.send(finalQuestionObj)
  }
  catch (err) {
    console.log(err)
    res.send([])
  }


})





