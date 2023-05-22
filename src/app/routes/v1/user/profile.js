/**TODO: this the users routes related to the user profile 
  routes it should include 
    1. get user by id 
    2. get all users ==? if needed and add pagination ,search filter ...
    3. the diff update user by id
      ==> this is just a suggestion
        a. name and bio 
        b. Full Name, Phone Number, Country, Date Of Birth,
         Specialty(category need better naming and make the same the name offer all the api)
         
         c. photos updated
        expert => d. expert related edits 
          ==> 
          1. categories => needs docs  ,salary ? send request to admin 

          2. mount them over at expert and add work hours to them

  
*/

const express = require('express');
const { validateRequest } = require('../../../../utils/validation');
const controller = require('../../../controller/user/profile');
const isAuthenticated = require('../../../../utils/middleware/auth/auth');
const router = express.Router();

router.get('/getuser/:_id',isAuthenticated,controller.getUser); 
router.get('/getall',isAuthenticatedVerified,controller.getUsers); 
router.put('/editdetails', isAuthenticated, controller.editDetails);


module.exports = router;
