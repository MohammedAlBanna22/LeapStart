const express = require('express');
const controller = require('../../../controller/expert');

const { upload } = require('../../../../utils/multerUploader');
const { reqExpert } = require('../../../validationSchema/expert');
const { validateRequest } = require('../../../../utils/validation');
const {
	isAuthenticatedVerified,
} = require('../../../../utils/middleware/auth');
const router = express.Router();

/**TODO:
 * in here we define the routes for experts
 * the routes we gonna create :
 *
 * 	done 1. request verify _ upload files
 * 	done 2. get expert by id ? or is it applied to user // ==> to user //
 * 				if it's applied to user i can either have a parameter that ask for an
 * 			expert expecting said user to be an expert so if he isn't throw some
 * 			error
 * 			if he is or if  asked without check anyway and return all data
 * 			==> both ways may for the time being meaning get from user should
 * 				get all data user
 * 				and expert get his data as well from his own id
 *
 * 	done 3. get all experts with filter pagination search ==> Bana work on it
 *
 * 4. update profile what is acceptable and what's ==> from user
 *
 * 5. time line routes as add work hours from the side of expert
 *
 * 6. notification to get the response to the verify req ==>  later when we
 *		make notification
 */

// TODO: ARGENT solve the repetition in expert
router.get('/', controller.getExperts); //isAuthenticatedVerified,

router.post(
	'/',
	upload.array('files'),
	isAuthenticatedVerified,
	// [reqExpert, validateRequest],
	controller.reqExpert
);

router.get('/:id', isAuthenticatedVerified, controller.getExpert);

router.put('/editProfile/:_id', controller.editProfile); //edit //isAuthenticatedVerified,///TODO: this should be mounted at user not expert
// and we add a different request here to edit specified expert data or use the user one for the both depending on the ui
router.post('/availabelHour',isAuthenticatedVerified,controller.addAvailabelHour); 

module.exports = router;
