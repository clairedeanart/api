const router = require('express').Router();

router.use('/auth', require('./auth'));
router.use('/upload', require('./files'));
router.use('/images', require('./images'));
router.use('/messages', require('./messages'));

module.exports = router;
