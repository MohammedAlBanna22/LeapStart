const express = require('express');

const router = express.Router();

router.use('/users', require('./v1/user'));

module.exports = router;
