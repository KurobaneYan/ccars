const chai = require('chai')
const Car = require('../models/car')
const db = require('../db/car')
const should = chai.should()

describe('DB operations with Car model', () => {
  it('returns all cars', (done) => {
    should.exist(Car)
    db.getAll()
      .then(cars => {
        cars.should.have.length.of.at.least(1)
      })
      .then(done, done)
  })
})
