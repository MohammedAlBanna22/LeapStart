const express = require('express');
const { validateRequest } = require('../../../../utils/validation');
const controller = require('../../../controller/profile');
const isAuthenticated = require('../../../../utils/middleware/auth/auth');
const router = express.Router();

/**TODO: this the users routes related to the user profile 
  routes it should include 
  done  1. get user by id 
   done 2. get all users ==? if needed and add pagination ,search filter ...
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

router.get('/getuser/:_id', controller.getUser);//isAuthenticated
router.get('/getall', controller.getUsers); //isAuthenticatedVerified,
router.put('/editdetails',isAuthenticated, controller.editDetails);
router.put('/editfulldetails',isAuthenticated, controller.editFullDetails);

module.exports = router;