const mongoose = require('mongoose');
const Request = require('./request');
const UserSchema = new mongoose.Schema(
	{
		name: {
			trim: true,
			type: String,
		},
		email: {
			trim: true,
			type: String,
		},
		password: {
			type: String,
		},
		country: {
			trim: true,
			type: String,
		},
		phone: {
			trim: true,
			type: String,
		},
		photo: {
			trim: true,
			type: String,
		},
		verifiedId: {
			status: {
				type: String,
				default: 'not_uploaded',
				enum: ['not_uploaded', 'pending', 'approved', 'rejected'],
			},
			idDocumentType: {
				type: String,
				enum: ['passport', 'driving_license', 'national_id'],
			},
			idNumber: {
				type: String,
				trim: true,
			},
			idFile: {
				type: String,
				trim: true,
			},
			disapproveReason: {
				reason: { type: String },
				note: { type: String },
			},
		},
		verifiedEmail: {
			type: Boolean,
			default: false,
		},

		role: {
			type: String,
			enum: ['user', 'expert', 'admin'],
			default: 'user',
		},

		isClientVerified: {
			type: Boolean,
			default: false,
		},
		isExpert: {
			type: Boolean,
			default: false,
		},
		expertId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Expert',
		},

		isBlocked: {
			type: Boolean,
			default: false,
		},
		lastLogin: {
			type: Date,
			default: Date.now,
		},
		lastLoginIP: {
			type: String,
		},
		isDeleted: {
			type: Boolean,
			default: false,
		},
	},
	{ timestamps: true }
);

// hook to let team know when user add id file

// user.save({idVerify:true})

UserSchema.post('save', async function f(user, next) {
	try {
		const isIdRequest = this.$__.saveOptions.sendIdRequest;
		const isExpertRequest = this.$__.saveOptions.sendExpertRequest;

		if (
			user.verifiedId.status === 'pending' &&
			user.verifiedId.idFile &&
			isIdRequest
		) {
			const request = await Request.findOne({
				user: user._id,
				type: 'user_id',
				isDeleted: false,
			});
			if (!request) {
				await Request.create({
					user: user._id,
					type: 'user_id',
					title: 'ID Approval',
					status: 'created',
				});
			} else {
				request.status = 'updated';
				await request.save();
			}
		}

		if (isExpertRequest) {
			const request = await Request.findOne({
				user: user._id,
				type: 'expert_verify',
				isDeleted: false,
			});
			if (!request) {
				await Request.create({
					user: user._id,
					type: 'expert_verify',
					title: 'expert verify',
					status: 'created',
				});
			} else {
				request.status = 'updated';
				await request.save();
			}
		}
	} catch (error) {
		return next(error);
	}
});
const User = mongoose.model('user', UserSchema);
module.exports = User;
