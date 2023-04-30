const fs = require('fs');
require('dotenv').config();

const { google } = require('googleapis');

class GoogleDriveService {
	constructor(clientId, clientSecret, redirectUri, refreshToken) {
		this.driveClient = this.createDriveClient(
			clientId,
			clientSecret,
			redirectUri,
			refreshToken
		);
	}

	createDriveClient(clientId, clientSecret, redirectUri, refreshToken) {
		const client = new google.auth.OAuth2(clientId, clientSecret, redirectUri);

		client.setCredentials({ refresh_token: refreshToken });

		return google.drive({
			version: 'v3',
			auth: client,
		});
	}

	createFolder(folderName) {
		return this.driveClient.files.create({
			resource: {
				name: folderName,
				mimeType: 'application/vnd.google-apps.folder',
			},
			fields: 'id, name',
		});
	}

	searchFolder(folderName) {
		return new Promise((resolve, reject) => {
			this.driveClient.files.list(
				{
					q: `mimeType='application/vnd.google-apps.folder' and name='${folderName}'`,
					fields: 'files(id, name)',
				},
				(err, res) => {
					if (err) {
						return reject(err);
					}

					const files = res.data.files;
					const firstFile = files && files[0];
					return resolve(firstFile || null);
				}
			);
		});
	}

	saveFile(fileName, filePath, fileMimeType, folderId) {
		return this.driveClient.files.create({
			requestBody: {
				name: fileName,
				mimeType: fileMimeType,
				parents: folderId ? [folderId] : [],
			},
			media: {
				mimeType: fileMimeType,
				body: fs.createReadStream(filePath),
			},
		});
	}
	async getFileById(fileId) {
		const response = await this.driveClient.files.get({
			fileId,
			fields: '	id, name, mimeType',
			// alt:'media'
		});
		return response.data;
	}
}

const driveService = new GoogleDriveService(
	process.env.GOOGLE_DRIVE_CLIENT_ID,
	process.env.GOOGLE_DRIVE_CLIENT_SECRET,
	process.env.GOOGLE_DRIVE_REDIRECT_URI,
	process.env.GOOGLE_DRIVE_REFRESH_TOKEN
);

/**
 * @type {{GoogleDriveService : GoogleDriveService}}
 */
module.exports.GoogleDriveService = GoogleDriveService;
module.exports.driveService = driveService;
