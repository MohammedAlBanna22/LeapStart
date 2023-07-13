const mongoose = require('mongoose');
const User = require('./user');
const Expert = require('./expert');
const Session = require('./session');
const workingHoursSchema = new mongoose.Schema(
	{
		expert: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Expert',
		},
		isBooked: {
			type: String,
			enum: ['booked', 'pending', 'available'],
			default: 'available',
		},
		sessionId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Session',
		},
		startTime: { type: Date },
		endTime: { type: Date },
		isDeleted: {
			type: Boolean,
			default: false,
		},
	},
	{ timestamps: true }
);

const WorkingHours = mongoose.model('WorkingHours', workingHoursSchema);
module.exports = WorkingHours;
