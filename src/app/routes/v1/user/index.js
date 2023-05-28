const express = require('express');
const { validateRequest } = require('../../../../utils/validation');
const { signup, login } = require('../../../validationSchema/user');
const controller = require('../../../controller/user');
const isAuthenticated = require('../../../../utils/middleware/auth/auth');

const router = express.Router();

router.post('/login', [login, validateRequest], controller.login);

router.post('/', [signup, validateRequest], controller.signup);

router.delete('/', isAuthenticated, controller.deleteUser);

router.post('/send-code-email', isAuthenticated, controller.sendCodeEmail);

// possibility to take all four routes up and mount them into auth route
// router.use('/auth', require('./auth'));
router.use('/verify', require('./verify'));

router.use('/password', require('./password'));

router.use('/profile', require('./profile'));

// block route with authorizations to admin only

module.exports = router;
