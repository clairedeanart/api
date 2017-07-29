const router = require('express').Router();
const path = require('path');
const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const Image = require('../models/images');
const _ = require('underscore');

aws.config.update({
  accessKeyId: process.env['AWS_ID'],
  secretAccessKey: process.env['AWS_KEY'],
  region: 'us-west-2',
});

const s3 = new aws.S3()

const upload = multer({
  storage: multerS3({
    s3: s3,
    key: (req, file, cb) => {
      cb(null, `${Date.now().toString()}-${file.originalname}`)
    },
    bucket: 'claire-dean-art',
    contentType: (req, file, cb) => {
      multerS3.AUTO_CONTENT_TYPE(req, file, cb)
    },
    region: 'us-west-2',
  })
});

router.post('/', upload.array('photos'), (req, res, next) => {
  const images = _.map(req.files, (file) => {
    return {
      filename: file.originalname || String(Math.random())+String(Date.now()),
      location: file.location,
      mimetype: file.mimetype,
      contentType: file.contentType,
      key: file.key,
      etag: file.etag,
    }
  });
  const uploaded = new Image.Collection(images);
  uploaded.invokeThen('save')
  .then((images) => res.success({images}) )
  .catch(next);
});

module.exports = router
