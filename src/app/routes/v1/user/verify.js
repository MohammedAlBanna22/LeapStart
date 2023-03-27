const express = require('express');
const {
  verify,
  verifyToken,
} = require('../../../validationSchema/user/verify');
const controller = require('../../../controller/user/verify');
const { validateRequest } = require('../../../../utils/validation');

const isAuthenticated = require('../../../../utils/middleware/auth/auth');

const router = express.Router();

router.post(
  '/email',
  isAuthenticated,
  [verify, validateRequest],
  controller.verifyEmail
);
router.post(
  '/refresh-token',
  [verifyToken, validateRequest],
  controller.verifyRefreshToken
);

module.exports = router;
