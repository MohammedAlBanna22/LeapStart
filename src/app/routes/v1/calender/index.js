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

// TODO: implement an request to get if user all his sessions
// if expert return his sessions and working hours
router.use('/expert', require('./expert'));

router.use('/user', require('./user'));

module.exports = router;
