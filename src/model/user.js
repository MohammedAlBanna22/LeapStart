const mongoose = require('mongoose');

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
      enum: ['user', 'expert', 'admins'],
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

//user.save({idVerfiy:true})

UserSchema.post('save', async function f(user, next) {
  try {
    //save option
  } catch (error) {
    return next(error);
  }
});

module.exports = mongoose.model('user', UserSchema);
