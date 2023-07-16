const multer = require('multer');
const { UnprocessableEntity } = require('./response/error/errors');

const storage = multer.diskStorage({
	destination(req, file, cb) {
		cb(null, '/uploads');
	},
	filename(req, file, cb) {
		const datetimestamp = Date.now();
		cb(null, `${file.fieldname}-${datetimestamp}`);
	},
});
const upload = multer({
	storage,
	fileFilter(req, file, cb) {
		const ext = file.originalname.split('.')[1];
		const fileparts = file.originalname.split('.');
		if (fileparts.length > 2) {
			cb(new UnprocessableEntity('Check File Format', false));
		}

		if (
			ext !== 'png' &&
			ext !== 'jpg' &&
			ext !== 'gif' &&
			ext !== 'jpeg' &&
			ext !== 'pdf'
		) {
			cb(new UnprocessableEntity('Check File Format'), false);
		}
		cb(null, true);
	},
	limits: {
		// 2MB file size
		fileSize: 2 * 1024 * 1024 + 10000,
	},
});

const uploadImage = multer({
	storage,
	fileFilter(req, file, cb) {
		const ext = file.originalname.split('.')[1];
		const fileparts = file.originalname.split('.');
		if (fileparts.length > 2) {
			cb(new UnprocessableEntity('Check File Format', false));
		}

		if (ext !== 'png' && ext !== 'jpg' && ext !== 'jpeg') {
			cb(new UnprocessableEntity('Check File Format'), false);
		}
		cb(null, true);
	},
	limits: {
		// 2MB file size
		fileSize: 2 * 1024 * 1024 + 10000,
	},
});
module.exports = { upload, uploadImage };
