const express = require('express');

const controller = require('../../controller/requests');
const router = express.Router();

// router.use(isAuthenticatedRole('admin'));

router.get('/:id', controller.getRequestById);

router.get('/', controller.getRequests);

module.exports = router;
