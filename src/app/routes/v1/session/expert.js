const express = require('express');
const controller = require('../../../controller/session/expert');
const isAuthenticated = require('../../../../utils/middleware/auth/auth');
const {
	isAuthenticatedRole,
} = require('../../../../utils/middleware/auth/index');

const router = express.Router();

router.use(isAuthenticatedRole('expert'));

router.put('/:id', controller.put);

module.exports = router;
