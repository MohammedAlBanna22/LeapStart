const mongoose = require('mongoose');
const User = require('./user');

const calendarSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
	},
});

const Calendar = mongoose.model('Calendar', calendarSchema);
module.exports = Calendar;
