let chai = require('chai')
let chaiHttp = require('chai-http')
let should = chai.should()
let server = require('../app')

chai.use(chaiHttp)

describe('/GET', () => {
  it('returns homepage', (done) => {
    chai.request(server)
      .get('/')
      .end((err, res) => {
        res.should.have.status(200)
        done()
      })
  })
})
