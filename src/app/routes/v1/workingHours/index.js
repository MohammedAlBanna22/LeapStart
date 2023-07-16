const express = require('express');
const { WorkingHours: workingHours } = require('../../../../model/');
const {
	isAuthenticatedRole,
} = require('../../../../utils/middleware/auth/index');
const controller = require('../../../controller/workingHours/');
const router = express.Router();

router.use(isAuthenticatedRole('expert'));

router.get('/', controller.getAll); // get all should get by week pagination
router.get('/:id', controller.getById);
router.post('/', controller.post);
router.put('/:id', controller.put);
router.delete('/:id', controller.delete);

module.exports = router;
