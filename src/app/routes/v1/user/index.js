const express = require('express');
const { validateRequest } = require('../../../../utils/validation');
const { signup } = require('../../../validationSchema/user');
const controller = require('../../../controller/user');
const router = express.Router();

// router.post('/login', [login, validateRequest], controller.login);

router.post('/', [signup, validateRequest], controller.signup);

// router.get('/'); // get all users more like search for expert regex // aggregate complex query

// router.get('/:id'); // get user by id for profile

// router.put('/'); // edit

// router.delete('/'); // if user want to delete account // isDeleted : true

// router.post('/sendVerficationCode'); // send verification code to email /

// router.use('/password'); // forget recover password // use send code

// router.use('/uploadId'); // for id doc upload

/// logout is it front or back end work ???

module.exports = router;
