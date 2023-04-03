const express = require('express');

const controller = require('../../../controller/user/upload.js');
const { validateRequest } = require('../../../../utils/validation');
const { uploadId } = require('../../../validationSchema/user/upload');
const isAuthenticated = require('../../../../utils/middleware/auth/auth');
const upload = require('../../../../utils/multerUploader');

const router = express.Router();

router.post(
	'/id',
	upload.single('file'),
	isAuthenticated,
	[uploadId, validateRequest],

	controller.uploadId
);
module.exports = router;
