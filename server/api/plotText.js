const router = require('express').Router();
const { findSummary, namesInSentences, findPeople} = require('./quoteUtils')

module.exports = router

router.post('/plotQuestion', async (req, res, next) => {

  const text = req.body.content
  try {
    const summary = await findSummary(text)

    const summaryString = summary.join('$')
    const people = await findPeople(summaryString)
    const question = await namesInSentences(people, summary)


  res.send(question)
  }
  catch (err) {
    console.error('COULD NOT GET PLOT Q', err)
    res.send([])
  }

})
