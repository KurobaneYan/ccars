let mongoose = require('mongoose')

let carSchema = new mongoose.Schema({
  manufacturer: String,
  model: String,
  year: Number,
  kilometrage: Number,
  fuelType: String,
  engineDisplacement: Number,
  transmissionType: String,
  photo: String,
  price: Number,
  views: Number
})

let Car = mongoose.model('Car', carSchema)

module.exports = Car
