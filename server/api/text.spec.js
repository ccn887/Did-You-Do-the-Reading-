const {expect} = require('chai')
const request = require('supertest')
const app = require('../index')

describe('Vocabulary question route', () => {


  describe('/api/text/vocab', () => {
    const content = ['acid']


    it('POST /api/text/vocab', () => {
      return request(app)
        .post('/api/text/vocab')
        .send(content)
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array')
          expect(res.body[0].question).to.be.equal('Which word means acid?')
        })
    })

    })
  })
