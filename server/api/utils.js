const axios = require('axios');

const API_KEY = '3bdcf6b9dc86fe668496d790bf084049';




const lookup = async(word) => {
  const thesaurus = await axios.get(`http://words.bighugelabs.com/api/2/${API_KEY}/${word}/json`);
  return thesaurus.data;
}



// const synonymFinder = (data) => {
//   let city;
//   data.results.forEach(addressComponentList => {
//     addressComponentList.address_components.forEach(component => {
//       if (component.types.includes('locality')){
//         city = component.long_name;
//       }
//     })
//   })
//   return city;
// }


module.exports = {lookup}
