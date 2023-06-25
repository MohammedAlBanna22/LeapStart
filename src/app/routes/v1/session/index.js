// TODO: this should hold necessary actions on session as booking ...
// we gonna integrate google calender to make it easier .
// and integrate google meeting to hold the meeting in our site
const express = require('express');
const router = express.Router();

router.use('/expert', require('./expert'));
router.use('/user', require('./user'));

module.exports = router;
