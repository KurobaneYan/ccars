const express = require('express')
const cloudinary = require('cloudinary')
const cloudinaryConfig = require('../cloudinary.config')
const cors = 'http://localhost:3000/cloudinary_cors.html'

cloudinary.config(cloudinaryConfig)
let router = express.Router()

router.get('/upload_tag', (req, res, next) => {
  res.send(cloudinary.uploader.image_upload_tag('image_id', { callback: cors }))
})

router.get('/upload_tag_params', (req, res, next) => {
  res.send(cloudinary.uploader.upload_tag_params({ callback: cors }))
})

module.exports = router
