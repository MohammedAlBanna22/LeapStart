const { driveService } = require('./googleDriveService');

module.exports.uploadFile = async (file, folder) => {
	const { originalname, mimetype, path } = file;
	const upFile = await driveService.saveFile(
		originalname,
		path,
		mimetype,
		folder.id
	);
	return upFile.data.id;
};

module.exports.getFolder = async (folderName) => {
	let folder = await driveService.searchFolder(folderName);
	if (!folder) {
		folder = await driveService.createFolder(folderName);
	}
	return folder;
};
