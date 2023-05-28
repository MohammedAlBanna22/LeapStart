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
const { upload, uploadImage } = require('../../../../utils/multerUploader');
const {
	uploadId,
	editProfile,
} = require('../../../validationSchema/user/profile');
const isAuthenticated = require('../../../../utils/middleware/auth/auth');

const router = express.Router();

router.get('/:_id', controller.getUser);

router.get('/', controller.getUsers);

router.put(
	'/',
	uploadImage.fields([
		{ name: 'profileImage', maxCount: 1 },
		{ name: 'profileBanner', maxCount: 1 },
	]),
	isAuthenticated,
	[editProfile, validateRequest],
	controller.editProfile
);

router.post(
	'/id',
	upload.single('file'),
	isAuthenticated,
	[uploadId, validateRequest],
	controller.uploadId
);

// router.post(
// 	'/profile-image',
// 	uploadImage.single('file'),
// 	isAuthenticated,
// 	controller.profileImage
// ); // this need to be deleted
module.exports = router;
