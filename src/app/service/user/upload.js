const config = require('config');
// const uploadFile = require('../../../utils/firebase/uploadFile');
// const { deleteFile } = require('../../../utils/helpers');
require('dotenv').config();
const { Users } = require('../../../model');
const { GoogleDriveService } = require('../../../utils/googleDriveService');
const fs = require('fs');
const driveService = new GoogleDriveService(
	process.env.GOOGLE_DRIVE_CLIENT_ID,
	process.env.GOOGLE_DRIVE_CLIENT_SECRET,
	process.env.GOOGLE_DRIVE_REDIRECT_URI,
	process.env.GOOGLE_DRIVE_REFRESH_TOKEN
);
module.exports.uploadId = async (data) => {
	try {
		const { _id, file, idNumber, idDocumentType } = data;

		const user = await Users.findOne({ _id, isDeleted: false });

		if (!user) {
			return { code: 1, message: 'user.notFoundUser' };
		}

		if (!file) return { code: 1, message: 'user.notFoundFile' };
		//TODO: UPLOAD FILES TO THIRD PARTY SERVICE INSTED OF OUR SERVER

		// const fileURL = await uploadFile(_id, 'ID_Files', file.mimetype, file.path);
		// if (!fileURL) throw new Error('something went wrong');
		// const fileURL = `host/uploads/file.path`;

		const { originalname, mimetype, path } = file;
		// console.log({ originalname, mimetype, path });
		const folderName = 'userID';

		let folder = await driveService.searchFolder(folderName);

		if (!folder) {
			folder = await driveService.createFolder(folderName);
		}

		const upFile = await driveService.saveFile(
			originalname,
			path,
			mimetype,
			folder.id
		);

		user.verifiedId = {
			status: 'pending',
			idDocumentType,
			idNumber,
			idFile: upFile.data.id,
		};
		await user.save({ sendIdRequest: true });

		fs.unlinkSync(file.path);

		// deleteFile(file.path);
		return {
			code: 0,
			message: 'File uploaded successfully',
			data: { fileId: upFile.data.id, user },
		};
	} catch (error) {
		console.log(error);
		throw new Error(error);
	}
};
