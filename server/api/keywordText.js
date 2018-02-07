const router = require('express').Router();
const { findNonPeopleKeywords } = require('./keywordUtils')
const NaturalLanguageUnderstandingV1 = require('watson-developer-cloud/natural-language-understanding/v1.js')
const natural_language_understanding = new NaturalLanguageUnderstandingV1({
  'username': process.env.WATSON_UN,
  'password': process.env.WATSON_PW,
  'version_date': '2017-02-27'
});

module.exports = router;

router.post('/keywordQuestion', async (req, res, next) => {
  const text = req.body.content

  const parameters = {
    'text': `${text}`,
    'features': {
      'keywords': {
        'limit': 40
      }
    }
  }

function natLangAsync(param){
      return new Promise(function(resolve,reject){
        natural_language_understanding.analyze(param,function(err,data){
               if(err)  return reject(err)
               resolve(data);
           });
      });
  }

  try {

  const keywords = await natLangAsync(parameters)
  if(keywords){
  const questions = await findNonPeopleKeywords(keywords, text)
  res.send(questions)
  }
  }
  catch(err) {
    console.error('ERROR:', err)
    res.send([])
  }
})
