// TODO: this should hold necessary actions on session as booking ...
// we gonna integrate google calender to make it easier .
// and integrate google meeting to hold the meeting in our site
const express = require('express');
const router = express.Router();
const controller = require('../../../controller/session/');

const isAuthenticated = require('../../../../utils/middleware/auth/auth');

router.use('/expert', require('./expert')); // respond,
router.use(isAuthenticated);

router.use('/user', require('./user')); // post, put/change details, delete/cancel

router.get('/:id', controller.getById);
router.get('/', controller.get);

module.exports = router;
