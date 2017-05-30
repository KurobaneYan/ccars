const mongoose = require('mongoose')
const Car = mongoose.model('Car')

const getManufacturers = () => Car.find().distinct('manufacturer')

function fillCarFields (car, newCar) {
  newCar.manufacturer = car.manufacturer
  newCar.model = car.model
  newCar.year = car.year
  newCar.kilometrage = car.kilometrage
  newCar.fuelType = car.fuelType
  newCar.engineDisplacement = car.engineDisplacement
  newCar.transmissionType = car.transmissionType
  newCar.price = car.price
  newCar.views = car.views
  newCar.photos = car['photos[]']
}

exports.getAll = () => Car.find()

exports.getById = carId => Car.findOne({ _id: carId })

exports.updateById = (carId, car) => {
  return Car.findOneAndUpdate({ _id: carId }, car, { new: true })
}

exports.create = (car) => {
  let newCar = new Car()
  fillCarFields(car, newCar)
  return newCar.save()
}

exports.update = (id, car) => {
  let newCar = {}
  fillCarFields(car, newCar)
  return Car.findOneAndUpdate({ _id: id }, newCar, { new: true })
}

exports.destroy = (id) => Car.remove({ _id: id })

exports.getFilteredCars = (filter) => Car.find(filter)

exports.getManufacturers = getManufacturers

exports.getModels = (manufacturer) => {
  return Car.find({ manufacturer: manufacturer }).distinct('model')
}

exports.getMostPopular = (amount) => {
  return Car.find().sort({ views: -1 }).limit(amount)
}

exports.getAveragePrice = manufacturer => {
  let pipeline = [
    { '$match': { 'manufacturer': manufacturer } },
    {
      '$group': {
        '_id': '_id',
        'avegarePrice': { '$avg': '$price' }
      }
    }
  ]
  return Car
    .aggregate(pipeline)
}

exports.getManufacturersData = () => {
  let promises = []
  return Car.find()
    .distinct('manufacturer')
    .then((manufacturers) => {
      manufacturers.forEach(i => {
        let pipeline = [
          {
            '$match': { 'manufacturer': i }
          },
          {
            '$group': {
              '_id': i,
              'averagePrice': { '$avg': '$price' },
              'averageViews': { '$avg': '$views' }
            }
          }
        ]
        promises.push(Car.aggregate(pipeline).then())
      })
      return Promise.all(promises)
    })
}

exports.getModelsData = () => {
  let promises = []
  return Car.find()
    .distinct('model')
    .then((manufacturers) => {
      manufacturers.forEach(i => {
        let pipeline = [
          {
            '$match': { 'model': i }
          },
          {
            '$group': {
              '_id': i,
              'averagePrice': { '$avg': '$price' },
              'averageViews': { '$avg': '$views' }
            }
          }
        ]
        promises.push(Car.aggregate(pipeline).then())
      })
      return Promise.all(promises)
    })
}
