let db = require('../db/car')
let helper = require('../helpers/car')
let validation = require('../helpers/validation')

exports.getAllCars = function (req, res) {
  let cars = db.getAll()
  addPagination(cars, req)
  show(req, res, cars)
}

exports.createCar = function (req, res) {
  let carModel = helper.createCarFromReq(req)
  let car = db.save(carModel)
  show(req, res, car)
}

exports.showCarById = function (req, res) {
  let carId = parseInt(req.params.carId, 10)
  let isValidCarId = validation.isPositiveInt(carId)
  if (isValidCarId) {
    let carFields = {}
    let car = db.getById(carId)
            .then(c => {
              helper.copyCarFields(c, carFields)
              carFields.views += 1
              return db.updateCarById(carId, carFields)
            })
    show(req, res, car)
  } else {
    res.status(400).json({error: 'invalid carId'})
  }
}

exports.getCarById = function (req, res) {
  let carId = parseInt(req.params.carId, 10)
  let isValidCarId = validation.isPositiveInt(carId)
  if (isValidCarId) {
    let car = db.getById(carId)
    show(req, res, car)
  } else {
    res.status(400).json({error: 'invalid carId'})
  }
}

exports.updateCarById = function (req, res) {
  let carId = parseInt(req.params.carId, 10)
  let isValidCarId = validation.isPositiveInt(carId)
  if (isValidCarId) {
    let carFields = helper.getCarFromReq(req)
    let car = db.updateCarById(carId, carFields)
    show(req, res, car)
  } else {
    res.status(400).json({error: 'invalid carId'})
  }
}

exports.deleteCarById = function (req, res) {
  let carId = parseInt(req.params.carId, 10)
  let isValidCarId = validation.isPositiveInt(carId)
  if (isValidCarId) {
    let result = db.deleteCarById(req.params.carId)
    show(req, res, result)
  } else {
    res.status(400).json({error: 'invalid carId'})
  }
}

exports.getManufacturers = function (req, res) {
  let manufacturers = db.getManufacturers()
  show(req, res, manufacturers)
}

exports.getModels = function (req, res) {
  let manufacturer = req.params.manufacturer
  let models = db.getModels(manufacturer)
  show(req, res, models)
}

exports.getMostPopular = function (req, res) {
  let amount = parseInt(req.params.amount, 10)
  let cars = db.getMostPopular(amount)
  show(req, res, cars)
}

exports.search = function (req, res) {
  let result = db.search(req.params.string, req.body)
  addPagination(result, req)
  show(req, res, result)
}

function showCar (req, res) {
  return car => res.json(car)
}

function handleError (req, res) {
  return error => res.status(400).json({error: error})
}

function show (req, res, promise) {
  promise
        .then(showCar(req, res))
        .catch(handleError(req, res))
}

function addPagination (query, req) {
  let page = parseInt(req.query.page)
  let limit = parseInt(req.query.limit)
  let isValidPage = validation.isPositiveInt(page)
  let isValidLimit = validation.isPositiveInt(page)
  if (isValidPage && isValidLimit) {
    query.skip(limit * (page - 1)).limit(limit)
  }
}
