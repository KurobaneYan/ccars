const express = require('express')
const db = require('../db/car')

let router = express.Router()

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

router.get('/cars/most-popular/:amount', (req, res, next) => {
  const amount = parseInt(req.params.amount)
  db.getMostPopular(amount)
    .then(models => {
      res.json(models)
    })
})

module.exports = router
