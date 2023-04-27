require('dotenv').config();
const { User, Expert } = require('../../../model');
const { GoogleDriveService } = require('../../../utils/googleDriveService');
const fs = require('fs');

const driveService = new GoogleDriveService(
	process.env.GOOGLE_DRIVE_CLIENT_ID,
	process.env.GOOGLE_DRIVE_CLIENT_SECRET,
	process.env.GOOGLE_DRIVE_REDIRECT_URI,
	process.env.GOOGLE_DRIVE_REFRESH_TOKEN
);
module.exports.reqExpert = async (req) => {
	try {
		const {
			files: files,
			user: { _id },
			body: { bio, catagories },
		} = req;

		// console.log(fields);

		const user = await User.findOne({ _id, isDeleted: false });
		if (!user) {
			return { code: 1, message: 'user.notFoundUser' };
		}

		if (!files) return { code: 1, message: 'user.notFoundFile' };

		const folderName = 'expertReq';
		let folder = await driveService.searchFolder(folderName);
		if (!folder) {
			folder = await driveService.createFolder(folderName);
		}

		const upFiles = await Promise.all(
			files.map(async (file) => {
				const { originalname, mimetype, path } = file;
				const upFile = await driveService.saveFile(
					originalname,
					path,
					mimetype,
					folder.id
				);
				return upFile;
			})
		);

		const expertDocs = upFiles.map((upFile) => upFile.data.id);

		const expert = await Expert.create({
			user: _id,
			bio,
			expertDocs,
			status: 'pending',
			catagories,
		});

		user.expertId = expert._id;
		await user.save({ sendExpertRequest: true });

		//delete files after upload
		files.map((file) => fs.unlinkSync(file.path));

		return { code: 0, message: 'success', data: { expert, user } };
	} catch (error) {
		console.log(error);
		throw new Error(error);
	}
};

module.exports.getExpert = async (expertId) => {
	try {
		const expert = await Expert.findOne({
			_id: expertId,
			isDeleted: false,
		}).populate('user');
		if (!expert) {
			return { code: 1, message: 'Expert not found', data: null };
		}
		return { code: 0, message: `expert is ${expert.status}`, data: expert };
	} catch (error) {
		throw new Error(error);
	}
};
