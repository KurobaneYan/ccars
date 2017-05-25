const express = require('express')

let router = express.Router()

router.get('/', (req, res, next) => {
  res.render('index', { title: 'CCars' })
})

router.get('/filter', (req, res, next) => {
  res.render('filter', { title: 'CCars Filter' })
})

router.get('/charts', (req, res, next) => {
  res.render('charts', { title: 'CCars Charts' })
})

module.exports = router
