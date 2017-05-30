const express = require('express')
const db = require('../db/car')

let router = express.Router()
let car = { _id: '592d3a3989658f2049d7cf60',
  manufacturer: 'Mitsubishi',
  model: 'Lancer',
  year: '2008',
  kilometrage: '53',
  fuelType: 'Gasoline',
  engineDisplacement: '2900',
  transmissionType: 'Manual',
  price: '570000',
  views: '289',
  __v: '0',
  photos: ['https://www.mitsubishi-motors.ca/media/vehicle/nav/15LanEvoFE_Titanium-Grey_09_medium.png'] }

router.get('/manufacturers', (req, res, next) => {
  db.getManufacturers()
    .then(mans => {
      res.json(mans)
    })
})

router.get('/models/:manufacturer', (req, res, next) => {
  db.getModels(req.params.manufacturer)
    .then(models => {
      res.json(models)
    })
})

router.get('/cars', (req, res, next) => {
  db.getAll()
    .then(cars => res.json(cars))
})

router.post('/cars/update', (req, res, next) => {
  console.log(req.body)
  console.log(req.body['photos[]'])
  res.json(car)
})

router.post('/cars/create', (req, res, next) => {
  console.log(req.body)
  res.json(car)
})

router.post('/cars/destroy', (req, res, next) => {
  db.destroy(req.body._id)
    .then(() => res.json())
    .catch((err) => res.json(err))
})

router.get('/cars/most-popular/:amount', (req, res, next) => {
  const amount = parseInt(req.params.amount)
  db.getMostPopular(amount)
    .then(models => {
      res.json(models)
    })
})

router.get('/:manufacturer/averagePrice', (req, res, next) => {
  db.getAveragePrice(req.params.manufacturer)
    .then(prices => res.json(prices))
})

router.get('/manufacturersData', (req, res, next) => {
  db.getManufacturersData()
    .then(p => {
      let result = p.map(i => {
        let output = {}
        i = i[0]
        output.name = i._id
        output.averagePrice = i.averagePrice
        output.averageViews = i.averageViews
        return output
      })
      res.json(result)
    })
})

router.get('/modelsData', (req, res, next) => {
  db.getModelsData()
    .then(p => res.json(p.map(i => i[0])))
})

router.get('/car/:carId', (req, res, next) => {
  db.getById(req.params.carId)
    .then(c => {
      c.views += 1
      return db.updateById(req.params.carId, c)
    })
    .then(c => res.json([c]))
    .catch(e => res.json({error: e}))
})

module.exports = router
