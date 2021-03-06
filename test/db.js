const chai = require('chai')
const Car = require('../models/car')
const db = require('../db/car')
const should = chai.should()

describe('DB operations with Car model', () => {
  it('returns all cars', done => {
    should.exist(Car)
    db.getAll()
      .then(cars => {
        cars.should.be.a('array')
        cars.should.have.length.of.at.least(1)
      })
      .then(done, done)
  })

  it('returns filtered array with cars', done => {
    should.exist(Car)
    const filter = {
      manufacturer: 'Mitsubishi',
      price: { $gt: 0 }
    }
    db.getFilteredCars(filter)
      .then(cars => {
        cars.should.be.a('array')
        cars.should.have.length.of.at.least(1)
      })
      .then(done, done)
  })

  it('returns array of manufacturers', done => {
    db.getManufacturers()
      .then(mans => {
        mans.should.be.a('array')
        mans.should.have.length.of.at.least(1)
        mans[0].should.be.a('string')
      })
      .then(done, done)
  })

  it('return array of models for manufacturer', done => {
    const manufacturer = 'Mitsubishi'
    db.getModels(manufacturer)
      .then(models => {
        models.should.be.a('array')
        models[0].should.be.a('string')
      })
      .then(done, done)
  })
})
