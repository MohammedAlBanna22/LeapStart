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

		const { originalname, mimetype, path } = file;

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

		//delete file
		fs.unlinkSync(file.path);

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

module.exports.getIdFile = async (_id) => {
	try {
		const user = await Users.findOne({ _id, isDeleted: false });
		if (!user) {
			return { code: 1, message: 'user not found', data: null };
		}
		// const file = await driveService.getFileById(user.verifiedId.idFile);
		// if (!file) {
		// 	return { code: 1, message: 'file not found', data: null };
		// }
		const File_ID = user.verifiedId.idFile;
		return {
			code: 0,
			message: 'here is id file ',
			data: { link: `https://drive.google.com/uc?id=${File_ID}` },
		};
	} catch (error) {
		console.log(error);
		throw new Error(error);
	}
};
