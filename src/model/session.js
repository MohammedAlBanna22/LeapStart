const mongoose = require('mongoose');
const Expert = require('./expert');
const user = require('./user');

const sessionSchema = new mongoose.Schema(
	{
		expertId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Expert',
		},
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},
		startTime: { type: Date },
		endTime: { type: Date },
		status: {
			type: String,
			enum: ['pending'],
			default: 'pending',
		},
		payment: {
			amount: { type: Number },
			currency: {
				type: String,
				default: 'usd',
			},
			status: {
				type: String,
				enum: ['pending'],
				default: 'pending',
			},
		},
		expertFeedBack: {
			type: String,
		},
		clientFeedBack: {
			type: String,
		},
		expertRate: {
			type: Number,
		},
		clientRate: {
			type: Number,
		},
		Canceled: {
			isCanceled: {
				type: Boolean,
				default: false,
			},
			reason: {
				type: String,
			},
			canceller: {
				type: String,
				enum: ['client', 'expert'],
			},
			cancellingTime: {
				type: Date,
			},
		},
	},
	{ timestamps: true }
);

const session = mongoose.model('Session', sessionSchema);
module.exports = session;
