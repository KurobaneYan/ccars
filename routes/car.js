let express = require('express')
let carController = require('../controllers/car')

let router = express.Router()

router.route('/admin/cars')
    .post(carController.createCar)

router.route('/admin/cars/:carId')
    .get(carController.getCarById)
    .put(carController.updateCarById)
    .delete(carController.deleteCarById)

router.route('/search')
    .post(carController.search)

router.route('/search/:string')
    .get(carController.search)
    .post(carController.search)

router.route('/cars')
    .get(carController.getAllCars)

router.route('/cars/mostPopular/:amount')
    .get(carController.getMostPopular)

router.route('/manufacturers')
    .get(carController.getManufacturers)

router.route('/models/:manufacturer')
    .get(carController.getModels)

router.route('/cars/:carId')
    .get(carController.showCarById)

module.exports = router
