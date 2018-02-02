const router = require('express').Router();
const { findPeople, findPlaces, findQuotations, quoteQuestions } = require('./quoteUtils');


module.exports = router;

router.post('/quoteQuestion', async (req, res, next) => {

  const text = `r time about everything. A day was twenty-four

  to the wire fence to see if there was a puppy — Miss Rachel’s rat terrier was
  expecting — instead we found someone sitting looking at us. Sitting down, he
  wasn’t much higher than the collards. We stared at him until he spoke:

  “Hey.”

  “Hey yourself,” said Jem pleasantly.

  “I’m Charles Baker Harris,” he said. “I can read.”

  “So what?” I said.

  “I just thought you’d like to know I can read. You got anything needs readin‘ I
  can do it...”

  “How old are you,” asked Jem, “four-and-a-half?”

  “Goin‘ on seven.”

  “Shoot no wonder, then,” said Jem, jerking his thumb at me. “Scout yonder’s
  been readin‘ ever since she was born, and she ain’t even started to school yet. You
  look right puny for goin’ on seven.”

  “I’m little but I’m old,” he said.

  Jem brushed his hair back to get a better look. “Why don’t you come over,

  Charles Baker Harris?” he said. “Lord, what a name.”

  “‘s not any funnier’n yours. Aunt Rachel says your name’s Jeremy Atticus Finch.”

  Jem scowled. “I’m big enough to fit mine,” he said. “Your name’s longer’n you
  are. Bet it’s a foot longer.”

  “Folks call me Dill,” said Dill, struggling under the fence.

  “Do better if you go over it instead of under it,” I said. “Where’d you come from?”

  Dill was from Meridian, Mississippi, was spending the summer with his aunt,

  Miss Rachel, and would be spending every summer in Maycomb from now on.

  His family was from Maycomb County originally, his mother worked for a
  photographer in Meridian, had entered his picture in a Beautiful Child contest and
  won five dollars. She gave the money to Dill, who went to the picture show
  twenty times on it.

  “Don’t have any picture shows here, except Jesus ones in the courthouse
  sometimes,” said Jem. “Ever see anything good?”`





try{

const quotations = findQuotations(text)
    const peopleResult = await findPeople(text)
    const placesResult = findPlaces(text)
    const question = quotations.map(quote => {
      return quoteQuestions(text,  quote.text, peopleResult )
    })
    const newQuestion = question.filter(question => {
      return question.hasOwnProperty('question')
    })
    res.send(newQuestion)
}
catch(err){
  console.log(err)
}


})

