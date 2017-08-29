const router = require('express').Router();
const Image = require('../models/images');
const _ = require('underscore');

router.get('/', (req, res, next) => {
  // new Image.
  Image.Collection.query((qb) => {
    qb.where({
      hidden: false,
      unedited: false,
    })
  })
  .orderBy('id', 'DESC')
  .fetch()
  .then((images) => res.success(images) )
  .catch(res.error.internal);
});

router.put('/:image_id', (req, res, next) => {
  Image.Model.forge(Object.assign({
    id: req.params.image_id,
  }, req.body))
  .save()
  .then((image) => res.success(image))
  .catch(res.error.internal);
});

router.get('/all', (req, res, next) => {
  Image.Collection.forge()
  .orderBy('created_at', 'DESC')
  .fetch()
  .then((images) => res.success(images))
  .catch(res.error.internal);
});


router.get('/unedited', (req, res, next) => {
  Image.Collection.query((qb) => {
    qb.where({
      hidden: false,
      unedited: true,
    })
  })
  .orderBy('created_at', 'DESC')
  .fetch()
  .then((images) => res.success(images))
  .catch(res.error.internal);
});

router.get('/hidden', (req, res, next) => {
  Image.Collection.query((qb) => {
    qb.where({
      hidden: true,
    })
  })
  .orderBy('created_at', 'DESC')
  .fetch()
  .then((images) => res.success(images))
  .catch(res.error.internal);
});


module.exports = router
