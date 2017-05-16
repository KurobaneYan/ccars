let express = require('express')

module.exports = function (fs, gfs, upload) {
  let router = express.Router()

  router.get('/', function (req, res, next) {
    res.render('image', { title: 'Express' })
  })

  router.get('/:filename', function (req, res) {
    let readStream = gfs.createReadStream({ filename: req.params.filename })
    readStream.on('error', (err) => {
      res.send(err)
    })
    readStream.pipe(res)
  })
  router.post('/', upload.single('image'), function (req, res, next) {
    let writestream = gfs.createWriteStream({
      filename: req.file.originalname
    })
    fs.createReadStream('./uploads/' + req.file.filename)
            .on('end', function () {
              fs.unlink('./uploads/' + req.file.filename, function (err) {
                console.log(err)
                res.send('success')
              })
            })
            .on('err', function () { res.send('Error uploading image') })
            .pipe(writestream)
  })

  return router
}
