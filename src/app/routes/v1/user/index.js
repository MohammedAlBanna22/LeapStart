const express = require('express');

const router = express.Router();

router.post('/login'); // need to be moated on auth end point

router.post('/'); //sign up

router.get('/'); // get all users more like search for expert regex

router.get('/:id'); // get user by id for profile

router.put('/'); // edit

router.delete('/'); // if user want to delete account

router.post('/sendVerficationCode'); // send verification code to email /

router.use('/password'); // forget recover password

router.use('/uploadId'); // for id doc upload

/// logout is it front or back end work ???

module.exports = router;
