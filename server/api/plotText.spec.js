/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const app = require('../index')

describe('Plot question routes', () => {


  describe('/api/plotText/plotQuestion', () => {
    const content = 'Harry Potter lived in Diagon Alley all his life once he became a wizard. He lived in a house with his mom before that, and met with Hagrid sometimes. Harry went to the store every day to get wizard supplies.'


    it('POST /api/plotText/plotQuestion', () => {
      return request(app)
        .post('/api/plotText/plotQuestion')
        .send({content: content})
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array')
          expect(res.body[0].question).to.be.equal('True or False? Harry Potter lived in Diagon Alley all his life once he became a wizard.')
        })
    })
  })
})
