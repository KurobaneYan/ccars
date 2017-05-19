const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../app')
const should = chai.should()

chai.use(chaiHttp)

describe('/GET upload tag params', () => {
  it('returns string with unescaped json', (done) => {
    chai.request(server)
      .get('/api/upload_tag_params')
      .end((err, res) => {
        should.exist(res)
        should.not.exist(err)
        res.should.have.status(200)
        res.text.should.be.a('string')
        res.text.should.contain('callback')
        res.text.should.contain('timestamp')
        res.text.should.contain('signature')
        res.text.should.contain('api_key')
        done()
      })
  })
})
