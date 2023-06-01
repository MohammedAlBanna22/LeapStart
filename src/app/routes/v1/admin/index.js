/**  routes that the admin do to complete the functionality of the system
 *
 * 1. handle the reqExert
 * 2. handle the id verification
 * 3. block user
 *
 * */

const express = require('express');

const controller = require('../../../controller/admin');
const { isAuthenticatedRole } = require('../../../../utils/middleware/auth');

const router = express.Router();

router.post('/verify_id', isAuthenticatedRole('admin'), (req, res) => {
	res.json({ success: true, user });
});
// router.post('/expertHandler', controller.expertHandler);
// router.post('/blockUser',controller.blockU ser);
module.exports = router;
