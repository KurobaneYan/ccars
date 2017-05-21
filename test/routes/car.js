const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../../app')
const should = chai.should()

chai.use(chaiHttp)

describe('/api/manufacturers', () => {
  it('returns array of manufacturers', (done) => {
    chai.request(server)
      .get('/api/manufacturers')
      .end((err, res) => {
        should.exist(res)
        should.not.exist(err)
        res.should.have.status(200)
        res.body.should.be.a('array')
        res.body[0].should.be.a('string')
        done()
      })
  })
})
