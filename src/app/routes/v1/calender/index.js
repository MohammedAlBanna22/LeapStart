/**
* TODO: this file gonna hold the routes needed to communicate with google     
    calender

    I think there is a way to create a new calender instance in which we do things in top of 
 * there gonna be 3 routes
 * 1. this index and if we fo implement google calender this gonna hold the
 *      auth routes;
 * 2. expert
 * 3. user
 */
const express = require('express');
const router = express.Router();

router.use('/expert', require('./expert'));

router.use('/user', require('./user'));

module.exports = router;
