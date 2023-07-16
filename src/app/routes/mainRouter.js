const express = require('express');

const router = express.Router();

router.use('/users', require('./v1/user'));

router.use('/experts', require('./v1/expert'));

router.use('/working-hours', require('./v1/workingHours'));

router.use('/session', require('./v1/session'));

//  router.use('/profile', require('./v1/profile'));
module.exports = router;
