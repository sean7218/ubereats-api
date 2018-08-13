var express = require('express')
var router = express.Router()
// var models = require('../models') // not in use
var bodyParser = require('body-parser')
var S3Controller = require('../controllers/s3/S3Controller')

router.use(bodyParser.urlencoded({ extended: true }))

router.post('/getImageUrl', function (req, res) {
  let bucket = req.body.bucket
  let key = req.body.key
  console.log('bucket: ' + bucket + ', key: ' + key)
  S3Controller.getImageUrl(bucket, key).then(url => {
    console.log(url)
    res.status(200).send(url)
  }, err => {
    res.status(404).send(err)
  })
})

router.post('/listObjects', S3Controller.listObjects)
router.post('/uploadImage', S3Controller.uploadImage)
router.post('/downloadImage', S3Controller.downloadImage)

module.exports = router
