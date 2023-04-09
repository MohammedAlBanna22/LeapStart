const express = require('express');

const router = express.Router();

router.use('/users', require('./v1/user'));
//TODO: finish applying the expert routes
// router.use('/expert', require('./v1/expert'));

module.exports = router;
