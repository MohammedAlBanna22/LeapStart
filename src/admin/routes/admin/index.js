/**  routes that the admin do to complete the functionality of the system
 *
 * 1. handle the reqExert
 * 2. handle the id verification
 * 3. block user
 *
 * */

const express = require('express');

const controller = require('../../controller/admin');

const router = express.Router();

router.post('/verify_id', controller.verifyId);
router.post('/expert_handler', controller.expertHandler);
// router.post('/blockUser',controller.blockU ser);
module.exports = router;
