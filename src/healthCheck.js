const express = require('express');
const { Success } = require('./utils/response/success/successes');

const router = express.Router();

router.get('/', async (req, res, next) =>
  next(new Success('ok from healthCheck'))
);

module.exports = router;
