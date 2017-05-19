const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../app')
const should = chai.should()

chai.use(chaiHttp)

describe('/GET direct upload file tag', () => {
  it('returns direct upload file tag', (done) => {
    chai.request(server)
      .get('/api/upload_tag')
      .end((err, res) => {
        should.exist(res)
        should.not.exist(err)
        res.should.have.status(200)
        res.text.should.be.a('string')
        res.text.should.contain('<input')
        res.text.should.contain('data-form-data')
        res.text.should.contain('callback')
        res.text.should.contain('timestamp')
        res.text.should.contain('signature')
        res.text.should.contain('api_key')
        done()
      })
  })
})
