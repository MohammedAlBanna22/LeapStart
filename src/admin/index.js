const express = require('express');
const { isAuthenticatedRole } = require('../utils/middleware/auth');

const router = express.Router();

// router.use(isAuthenticatedRole('admin'));

router.use('/requests', require('./routes/requests'));

router.use('/', require('./routes/admin'));

module.exports = router;
