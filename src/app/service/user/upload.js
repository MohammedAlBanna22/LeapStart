const config = require('config');
// const uploadFile = require('../../../utils/firebase/uploadFile');
// const { deleteFile } = require('../../../utils/helpers');
const { Users } = require('../../../model');

module.exports.uploadId = async (data) => {
	const { _id, file, idNumber, idDocumentType } = data;
	try {
		const user = await Users.findOne({ _id, isDeleted: false });
		if (!user) {
			return { code: 1, message: 'user.notFoundUser' };
		}
		if (!file) return { code: 1, message: 'user.notFoundFile' };
		//TODO: UPLOAD FILES TO THIRD PARTY SERVICE INSTED OF OUR SERVER

		// const fileURL = await uploadFile(_id, 'ID_Files', file.mimetype, file.path);
		// if (!fileURL) throw new Error('something went wrong');
		const fileURL = `host/uploads/file.path`;
		user.verifiedId = {
			status: 'pending',
			idDocumentType,
			idNumber,
			idFile: fileURL,
		};
		await user.save({ sendIdRequest: true });

		// deleteFile(file.path);

		return {
			code: 0,
			message: 'commonSuccess.message',
			data: null,
		};
	} catch (error) {
		console.log(error);
		throw new Error(error);
	}
};
