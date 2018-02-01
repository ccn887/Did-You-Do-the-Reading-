

const axios = require('axios');
const GOOGLE_NAT_LANG_API_KEY = process.env.GOOGLE_NATURAL_LANGUAGE_API_KEY
const nlp = require('compromise')


// const people = findPeople(txt)

var txt = `One morning I caught my foot in the crack where two old treetrunks
joined. "Owp!" I yelled. "Mama! Waa!" I was out much later than I'd
meant to be. As a rule I was back in the cave by dawn, but that day
I'd been lured out farther than usual by the heavenly scent of newborn
calf--ah, sweeter than flowers, as sweet as my mama's milk. I looked
at the foot in anger and disbelief. It was wedged deep, as if the two
oak trees were eating it. Black sawdust--squirreldust--was spattered
up the leg almost to the thigh. I'm not sure now how the accident
happened. I must have pushed the two boles apart as I stepped up into
the place where they joined, and then when I stupidly let go again
they closed on my foot like a trap. Blood gushed from my ankle and
shin, and pain flew up through me like fire up the flue of a mountain.
I lost my head. I bellowed for help, so loudly it made the ground
shake. "Mama! Waa! Waaa!" I bellowed to the sky, the forest, the
cliffs, until I was so weak from loss of blood I could barely wave my
arms. "I'm going to die," I wailed. "Poor Grendel! Poor old Mama!" I
wept and sobbed. "Poor Grendel will hang here and starve to death," I
told myself, "and no one will ever even miss him!" The thought enraged
me. I hooted. I thought of my mother's foreign eyes, staring at me
from across the room: I thought of the cool, indifferent eyes of the
others. I shrieked in fear; still no one came.`

var quote = "Mama! Waa! Waaa!"


function quoteQuestions( txt, quote, people){
var sendQuoteObj = {}
  const qLength = quote.length
  const startIndex = txt.indexOf(quote)+qLength+1
  let residue = ''
  
  for (let i = startIndex; i < txt.length; i++){
    
    if(txt[i-1] === "."){
    break;
    }
    residue += txt[i]
  }
  const peopleFiltered = people.filter(item => {
      console.log('peoplefiltereditem', item)
    return residue.includes(item)
  })
  console.log('filter people', peopleFiltered)
  if (peopleFiltered.length === 1){
    let question = "who said " + quote + "?'"
    let rightAnswer = peopleFiltered[0]
    sendQuoteObj.question = question
    sendQuoteObj.rightAnswer = rightAnswer
  }
  return sendQuoteObj
}



const findSentiment = async(text)=> {
  try{
    const sentiment = await axios.post(`https://language.googleapis.com/v1/documents:analyzeSentiment?key=${GOOGLE_NAT_LANG_API_KEY}`, text)
  return sentiment
  }
  catch (err){
    console.log(err)
  }
}


const findPeople = (quoteStr) => {
      const doc = nlp(quoteStr)
      const people = doc.people()
   
      people.sort('frequency').unique()
      const peopleArr =  people.out('freq')
      console.log('thereAL people shady', peopleArr)
      return peopleArr
    }

    const findPlaces = (quoteStr) => {
        const doc = nlp(quoteStr)
      const places = doc.places()
      places.sort('alpha')
     const placesArr =  places.out('array')
     return placesArr
  }

  const findQuotations = (quoteStr) => {
    const doc = nlp(quoteStr)
    const quotations = doc.quotations()
 
    // people.sort('frequency').unique()
    // const peopleArr =  people.out('array')
    return quotations.data()
  }


// const findEntities = async (quoteStr) => {
//   try{
//     const doc = nlp(quoteStr)
//     console.log('docPeople', doc)
//     const people = doc.people()
 
//     people.normalize().sort('frequency').unique()
//     const peopleArr =  people.out('array')

//     const places = doc.places()
//     places.sort('alpha')
//    const placesArr =  places.out('array'))


    
//     // doc.sentences().toNegative()
//     // return entities
//   }
//   catch (err){
//     console.log(err)
//   }
// }

module.exports = {findSentiment, findPlaces, findPeople, findQuotations, quoteQuestions}
