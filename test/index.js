const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../app')
const should = chai.should()

chai.use(chaiHttp)

describe('/GET', () => {
  it('returns homepage', (done) => {
    chai.request(server)
      .get('/')
      .end((err, res) => {
        should.exist(res)
        should.not.exist(err)
        res.should.have.status(200)
        done()
      })
  })
})
