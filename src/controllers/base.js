const router = require('express').Router();

router.use('/auth', require('./auth'));
router.use('/upload', require('./files'))

module.exports = router;
