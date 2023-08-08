const mongoose = require('mongoose');
const app = require('./app');

const http = require('http');
const server = http.createServer(app);
const videoChatRouter = require('../src/app/routes/v1/meeting/index')(server);
app.use('/video-chat', videoChatRouter);

require('dotenv').config();

const PORT = process.env.PORT || 3000;

startServer();

async function startServer() {
	await connectDB();
	server.listen(PORT, () => {
		console.log(`running at port ${PORT}`);
	});
}

async function connectDB() {
	mongoose.set('strictQuery', true);
	const conn = await mongoose.connect(process.env.DB_CONNECTION, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});
	console.log(`MongoDB Connected`);
}
