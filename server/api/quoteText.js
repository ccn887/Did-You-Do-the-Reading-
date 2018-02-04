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

router.post('/placeQuestion', async (req, res, next) => {

  const text = `Miss Caroline went to her desk and opened her purse. “Here’s a quarter,” she said
  to Walter. “Go and eat downtown today. You can pay me back tomorrow.”



  Walter shook his head. “Nome thank you ma’am,” he drawled softly.

  Impatience crept into Miss Caroline’s voice: “Here Walter, come get it.”

  Walter shook his head again.

  When Walter shook his head a third time someone whispered, “Go on and tell
  her, Scout.”

  I turned around and saw most of the town people and the entire bus delegation
  looking at me. Miss Caroline and I had conferred twice already, and they were
  looking at me in the innocent assurance that familiarity breeds understanding.

  I rose graciously on Walter’s behalf: “Ah — Miss Caroline?”

  “What is it, Jean Louise?”

  “Miss Caroline, he’s a Cunningham.”

  I sat back down.

  “What, Jean Louise?”

  I thought I had made things sufficiently clear. It was clear enough to the rest of
  us: Walter Cunningham was sitting there lying his head off. He didn’t forget his
  lunch, he didn’t have any. He had none today nor would he have any tomorrow or
  the next day. He had probably never seen three quarters together at the same time
  in his life.

  I tried again: “Walter’s one of the Cunninghams, Miss Caroline.”

  “I beg your pardon, Jean Louise?”

  “That’s okay, ma’am, you’ll get to know all the county folks after a while. The
  Cunninghams never took anything they can’t pay back — no church baskets and no
  scrip stamps. They never took anything off of anybody, they get along on what
  they have. They don’t have much, but they get along on it.”

  My special knowledge of the Cunningham tribe — one branch, that is — was gained
  from events of last winter. Walter’s father was one of Atticus’s clients. After a
  dreary conversation in our livingroom one night about his entailment, before Mr.
  Cunningham left he said, “Mr. Finch, I don’t know when I’ll ever be able to pay
  you.”

  “Let that be the least of your worries, Walter,” Atticus said.



  When I asked Jem what entailment was, and Jem described it as a condition of
  having your tail in a crack, I asked Atticus if Mr. Cunningham would ever pay us.

  “Not in money,” Atticus said, “but before the year’s out I’ll have been paid. You
  watch.”

  We watched. One morning Jem and I found a load of stovewood in the back yard.
  Later, a sack of hickory nuts appeared on the back steps. With Christmas came a
  crate of smilax and holly. That spring when we found a crokersack full of turnip
  greens, Atticus said Mr. Cunningham had more than paid him.

  “Why does he pay you like that?” I asked.

  “Because that’s the only way he can pay me. He has no money.”

  “Are we poor, Atticus?”

  Atticus nodded. “We are indeed.”

  Jem’s nose wrinkled. “Are we as poor as the Cunninghams?”

  “Not exactly. The Cunninghams are country folks, farmers, and the crash hit them
  hardest.”

  Atticus said professional people were poor because the farmers were poor. As
  Maycomb County was farm country, nickels and dimes were hard to come by for
  doctors and dentists and lawyers. Entailment was only a part of Mr.

  Cunningham’s vexations. The acres not entailed were mortgaged to the hilt, and
  the little cash he made went to interest. If he held his mouth right, Mr.
  Cunningham could get a WPA job, but his land would go to ruin if he left it, and
  he was willing to go hungry to keep his land and vote as he pleased. Mr.
  Cunningham, said Atticus, came from a set breed of men.

  As the Cunninghams had no money to pay a lawyer, they simply paid us with
  what they had. “Did you know,” said Atticus, “that Dr. Reynolds works the same
  way? He charges some folks a bushel of potatoes for delivery of a baby. Miss
  Scout, if you give me your attention I’ll tell you what entailment is. Jem’s
  definitions are very nearly accurate sometimes.”

  If I could have explained these things to Miss Caroline, I would have saved
  myself some inconvenience and Miss Caroline subsequent mortification, but it
  was beyond my ability to explain things as well as Atticus, so I said, “You’re



  shamin‘ him, Miss Caroline. Walter hasn’t got a quarter at home to bring you, and
  you can’t use any stovewood.”

  Miss Caroline stood stock still, then grabbed me by the collar and hauled me back
  to her desk. “Jean Louise, I’ve had about enough of you this morning,” she said.
  “You’re starting off on the wrong foot in every way, my dear. Hold out your
  hand.”

  I thought she was going to spit in it, which was the only reason anybody in
  Maycomb held out his hand: it was a time-honored method of sealing oral
  contracts. Wondering what bargain we had made, I turned to the class for an
  answer, but the class looked back at me in puzzlement. Miss Caroline picked up
  her ruler, gave me half a dozen quick little pats, then told me to stand in the
  corner. A storm of laughter broke loose when it finally occurred to the class that
  Miss Caroline had whipped me.

  When Miss Caroline threatened it with a similar fate the first grade exploded
  again, becoming cold sober only when the shadow of Miss Blount fell over them.
  Miss Blount, a native Maycombian as yet uninitiated in the mysteries of the
  Decimal System, appeared at the door hands on hips and announced: “If I hear
  another sound from this room I’ll burn up everybody in it. Miss Caroline, the
  sixth grade cannot concentrate on the pyramids for all this racket!”

  My sojourn in the corner was a short one. Saved by the bell, Miss Caroline
  watched the class file out for lunch. As I was the last to leave, I saw her sink
  down into her chair and bury her head in her arms. Had her conduct been more
  friendly toward me, I would have felt sorry for her. She was a pretty little thing.


  Contents - Prev / Next


  Chapter 3

  Catching Walter Cunningham in the schoolyard gave me some pleasure, but when
  I was rubbing his nose in the dirt Jem came by and told me to stop. “You’re


  bigger’n he is,” he said.

  “He’s as old as you, nearly,” I said. “He made me start off on the wrong foot.”
  “Let him go, Scout. Why?”

  “He didn’t have any lunch,” I said, and explained my involvement in Walter’s
  dietary affairs.

  Walter had picked himself up and was standing quietly listening to Jem and me.
  His fists were half cocked, as if expecting an onslaught from both of us. I stomped
  at him to chase him away, but Jem put out his hand and stopped me. He examined
  Walter with an air of speculation. “Your daddy Mr. Walter Cunningham from Old
  Sarum?” he asked, and Walter nodded.

  Walter looked as if he had been raised on fish food: his eyes, as blue as Dill
  Harris’s, were red-rimmed and watery. There was no color in his face except at
  the tip of his nose, which was moistly pink. He fingered the straps of his overalls,
  nervously picking at the metal hooks.

  Jem suddenly grinned at him. “Come on home to dinner with us, Walter,” he said.
  “We’d be glad to have you.”

  Walter’s face brightened, then darkened.

  Jem said, “Our daddy’s a friend of your daddy’s. Scout here, she’s crazy — she
  won’t fight you any more.”`


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

      obj.question = `Who "` + finalPart.trim() + `"?`
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
       return  name !== righty && !name.includes(righty)
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

router.post('/modifierQuestion', async (req, res, next) => {




  try {

    const modifiers = await findSyntax(text)

    res.send(peopleResult)
  }
  catch (err) {
    console.log(err)
  }


})



