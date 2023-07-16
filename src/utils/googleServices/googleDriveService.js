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
/**
 * Certainly! Here's a more detailed explanation of the first solution, which involves using the Google Drive API and the OAuth2 library in your Node.js application.

1. Set up your Google Cloud project and enable the Google Drive API: 
   - Create a new project in the Google Cloud Console (https://console.cloud.google.com).
   - Enable the Google Drive API for your project.
   - Create the necessary credentials (OAuth client ID) for your application.

2. Install the required libraries:
   - In your Node.js project, install the `google-auth-library` package using npm or yarn:
     ```
     npm install google-auth-library
     ```
     or
     ```
     yarn add google-auth-library
     ```

3. Configure the authentication flow:
   - Import the `google-auth-library` package in your Node.js application:
     ```javascript
     const { google } = require('google-auth-library');
     ```
   - Create an OAuth2 client instance with your credentials:
     ```javascript
     const auth = new google.auth.OAuth2(
       clientId,
       clientSecret,
       redirectUri
     );
     ```
   - Generate the authentication URL:
     ```javascript
     const authUrl = auth.generateAuthUrl({
       access_type: 'offline',
       scope: ['https://www.googleapis.com/auth/drive'],
     });
     ```
     This URL should be visited by the user to grant access to your application. After authorization, Google will redirect the user to the specified redirect URI with an authorization code.

   - Exchange the authorization code for access and refresh tokens:
     ```javascript
     const { tokens } = await auth.getToken(authorizationCode);
     const refreshToken = tokens.refresh_token;
     // Store the refresh token securely for future use
     ```

4. Store the refresh token:
   - After exchanging the authorization code, you will receive tokens, including a refresh token. Store this refresh token securely in a database or configuration file for subsequent use. Make sure to protect it as it grants access to the user's Google Drive account.

5. Use the stored refresh token to obtain access tokens:
   - When uploading files to Google Drive in your Node.js API, retrieve the stored refresh token and set it in the OAuth2 client:
     ```javascript
     auth.setCredentials({ refresh_token: storedRefreshToken });
     ```
   - Obtain a new access token:
     ```javascript
     const accessToken = await auth.getAccessToken();
     ```
     You can now use this access token to make authenticated requests to the Google Drive API.

6. Upload files to Google Drive:
   - Use the Google Drive API client library or make HTTP requests to upload files to Google Drive using the obtained access token.

By following these steps, you can programmatically obtain a refresh token, securely store it, and use it to obtain access tokens for interacting with the Google Drive API in your Node.js application. Remember to handle token expiration and refresh the access token when necessary.
 */
