const mongoose = require('mongoose')
const Car = mongoose.model('Car')

exports.getAll = () => Car.find()

exports.getFilteredCars = (filter) => Car.find(filter)

exports.getManufacturers = () => Car.find().distinct('manufacturer')

exports.getModels = (manufacturer) => {
  return Car.find({ manufacturer: manufacturer }).distinct('model')
}

exports.getMostPopular = (amount) => {
  return Car.find().sort({ views: -1 }).limit(amount)
}
