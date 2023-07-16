const express = require('express');
const isAuthenticated = require('../../../../utils/middleware/auth/auth');

const router = express.Router();
router.use(isAuthenticated);

module.exports = router;
