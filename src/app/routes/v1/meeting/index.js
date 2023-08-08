const express = require('express');
const router = express.Router();
const socketIo = require('socket.io');

module.exports = (server) => {
	const io = socketIo(server, {
		cors: {
			origin: '*',
		},
	});

	router.get('/', (req, res) => {
		res.send('Video chat route');
	});

	io.of('/video-chat').on('connection', (socket) => {
		console.log('A user connected to video chat namespace');

		socket.on('join-room', (roomId, userId) => {
			socket.join(roomId);
			socket.to(roomId).broadcast.emit('user-connected', userId);

			socket.on('disconnect', () => {
				socket.to(roomId).broadcast.emit('user-disconnected', userId);
			});
		});
	});

	return router;
};
