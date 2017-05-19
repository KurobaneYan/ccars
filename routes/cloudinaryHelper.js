const express = require('express')
const cloudinary = require('cloudinary')
const cloudinaryConfig = require('../cloudinary.config')
const cloudinaryCors = 'http://localhost:3000/cloudinary_cors.html'

cloudinary.config(cloudinaryConfig)
let router = express.Router()

router.get('/upload_tag', (req, res, next) => {
  let upTag = cloudinary.uploader.image_upload_tag('image_id', { callback: cloudinaryCors })
  res.send(upTag)
})

router.get('/upload_tag_params', (req, res, next) => {
  let params = cloudinary.uploader.upload_tag_params({ callback: cloudinaryCors })
  res.send(params)
})

module.exports = router
