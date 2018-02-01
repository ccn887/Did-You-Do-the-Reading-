const axios = require('axios');
const GOOGLE_NAT_LANG_API_KEY = process.env.GOOGLE_NATURAL_LANGUAGE_API_KEY
const nlp = require('compromise')




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
      const peopleArr =  people.out('array')
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

module.exports = {findSentiment, findPlaces, findPeople, findQuotations}
