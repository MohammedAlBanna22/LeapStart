const express = require('express');

const router = express.Router();

router.use('/users', require('./v1/user'));

//TODO: finish applying the expert routes
router.use('/experts', require('./v1/expert'));

router.use('/working-hours', require('./v1/workingHours'));
//  router.use('/profile', require('./v1/profile'));

module.exports = router;
