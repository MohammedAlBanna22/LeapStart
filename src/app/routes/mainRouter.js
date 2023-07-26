const express = require('express');

const router = express.Router();

router.use('/users', require('./v1/user'));

router.use('/experts', require('./v1/expert'));

router.use('/session', require('./v1/session'));
router.use('/post', require('./v1/post'));

module.exports = router;
