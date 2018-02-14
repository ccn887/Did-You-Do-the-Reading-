/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const app = require('../index')

describe('Quote and character question routes', () => {


  describe('/api/plotText/plotQuestion', () => {
    const content = `"Harry Potter lived in Diagon Alley all his life once he became a wizard," said Hagrid. He lived in a house with his mom before that, and met with Hagrid sometimes. Harry went to the store every day to get wizard supplies because that was his favorite thing to do. Hermione always said that he was a fool. Mr. Parsons always said that the wizard was his favorite, without a doubt. Henry dragged Harry up the stairs, and Drako Malfoy followed a little too closely. Mr. Potter pulled back his bangs to show a lightning scar. Harry left his mom there after the war ended.`


    it('POST /api/quoteText/quoteQuestion', () => {
      return request(app)
        .post('/api/quoteText/quoteQuestion')
        .send({content: content})
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array')
          expect(res.body[0].question).to.be.equal('Who said, "Harry Potter lived in Diagon Alley all his life once he became a wizard"?')
        })
    })

    it('POST /api/quoteText/whoDidItQuestion', () => {
      return request(app)
        .post('/api/quoteText/whoDidItQuestion')
        .send({content: `Harry went to the store every day to get wizard supplies because that was his favorite thing to do!`})
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array')
          expect(res.body[0].question).to.be.equal('Who went to the store every day to get wizard supplies because that was his favorite thing to do?')
        })
    })
  })
})
