const express = require('express')
const path = require('path')
const logger = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const config = require('./config')

require('./models/car')

const carRoute = require('./routes/car')
const cloudinaryRoute = require('./routes/cloudinaryHelper')

let app = express()

mongoose.Promise = global.Promise
mongoose.connect(config.databaseUrl)
const connection = mongoose.connection

connection.on('error', console.error.bind(console, 'connection error:'))
connection.once('open', () => {
  console.log('Mongoose connected to ' + config.databaseUrl)
})

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With')
  res.header('Access-Control-Allow-Methods', 'GET, POST', 'PUT', 'DELETE')
  next()
})

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

app.use('/api', carRoute)
app.use('/api', cloudinaryRoute)

app.use((req, res, next) => {
  let err = new Error('Not Found')
  err.status = 404
  next(err)
})

app.use((err, req, res, next) => {
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}
  res.status(err.status || 500)
  res.send('error')
})

module.exports = app
