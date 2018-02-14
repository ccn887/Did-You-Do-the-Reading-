/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const app = require('../index')

describe('Keyword question routes', () => {


  describe('/api/keywordText/keywordQuestion', () => {
    const content = 'Harry Potter lived in Diagon Alley all his life once he became a wizard. He lived in a house with his mom before that, and met with Hagrid sometimes.'


    it('POST /api/keywordText/keywordQuestion', () => {
      return request(app)
        .post('/api/keywordText/keywordQuestion')
        .send({content: content})
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array')
          expect(res.body[0].question).to.be.equal('Harry Potter lived in _____________ all his life once he became a wizard. ')
        })
    })
  })
})
