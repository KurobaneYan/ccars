const mongoose = require('mongoose')
const Car = mongoose.model('Car')

exports.getAll = () => Car.find()
