const mongoose = require('mongoose')
const Car = mongoose.model('Car')

const getManufacturers = () => Car.find().distinct('manufacturer')

exports.getAll = () => Car.find()

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
