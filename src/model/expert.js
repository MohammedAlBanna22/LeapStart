const mongoose = require('mongoose');
const User = require('./user');
const expertSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},
		hourlyRate: {
			type: Number,
		},
		expertRate: {
			type: Number,
		},
		numberOfSessions: {
			type: Number,
		},
		status: {
			type: String,
			enum: ['pending', 'rejected', 'approved'],
			default: 'pending',
		},
		disapproveReason: {
			reason: { type: String },
			note: { type: String },
		},
		expertDocs: {
			type: [String],
			default: [],
		},
		// expertBio: {
		// 	type: String,
		// },
		catagories: {
			type: [String],
		},
		availableHours: {
			daysOfWork: {
				type: [String],
				default: [],
			},
			fromTime: {
				type: String,
			},
			toTime: {
				type: String,
			},
			fromDate: {
				type: String,
			},
			toDate: {
				type: String,
			},
		},
		/// => need to be deleted since we have a dedicated working hours module
		// bookedHours: {
		// 	type: [
		// 		{
		// 			startTime: { type: Date, required: true },
		// 			endTime: { type: Date, required: true },
		// 		},
		// 	],
		// 	default: [],
		// }, // => need to be deleted since we have dedicated module for sessions
	},
	{ timestamps: true }
);

const Expert = mongoose.model('Expert', expertSchema);
module.exports = Expert;

//  ADD BOOKED HOURS BY THE FOLLOWING CODE
// const expert = await Expert.findById(expertId);
// expert.bookedHours.push({
//   startTime: new Date('2022-05-01T10:00:00Z'),
//   endTime: new Date('2022-05-01T11:00:00Z'),
// });
// await expert.save();
