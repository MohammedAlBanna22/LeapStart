const express = require('express');
const { validateRequest } = require('../../../../utils/validation');
const { signup, login } = require('../../../validationSchema/user');
const controller = require('../../../controller/user');
const isAuthenticated = require('../../../../utils/middleware/auth/auth');

const router = express.Router();

// TODO: upload profile pic could be made in edit profile // route alone

router.post('/login', [login, validateRequest], controller.login);

router.post('/', [signup, validateRequest], controller.signup);

// router.get('/'); // get all users more like search for expert regex // aggregate complex query

router.get('/getuser/:_id', controller.getUser); // get user by id for profile

// router.put('/'); // edit

router.delete('/', isAuthenticated, controller.deleteUser); // if user want to delete account // isDeleted : true

router.post('/send-code-email', isAuthenticated, controller.sendCodeEmail); // send verification code to email /

router.use('/verify', require('./verify'));
router.use('/password', require('./password')); // forget recover password // use send code

router.use('/upload', require('./upload')); // for id doc upload

module.exports = router;
