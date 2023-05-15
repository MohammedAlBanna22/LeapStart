const express = require('express');
const { Success } = require('./utils/response/success/successes');

const router = express.Router();

router.get('/', async (req, res, next) => {
	console.log('health Check');
	return next(new Success('ok from healthCheck'));
});

module.exports = router;
