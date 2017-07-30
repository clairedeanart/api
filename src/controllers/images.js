const router = require('express').Router();
const Image = require('../models/images');
const _ = require('underscore');

router.get('/', (req, res, next) => {
  Image.Collection.forge({

  })
  .orderBy('id', 'DESC')
  .fetch()
  .then((images) => res.success(images) )
  .catch(res.error.internal);
});

module.exports = router
