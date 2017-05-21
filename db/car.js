const mongoose = require('mongoose')
const Car = mongoose.model('Car')

exports.getAll = () => Car.find()

exports.getFilteredCars = (filter) => {
  return Car.find(filter)
}
