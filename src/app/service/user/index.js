const { Users, Verification } = require('../../../model');
const {
  sendVerificationCodeEmail,
} = require('../../../utils/notifications/email');
const jwt = require('../../../utils/jwt');
const bcrypt = require('bcrypt');
module.exports.signup = async (data) => {
  try {
    const { name, email, password, country, phone } = data;
    const { SALT } = process.env;
    const isUsedEmail = await Users.findOne({ email, isDeleted: false });
    if (isUsedEmail) {
      return { code: 2, message: 'user.usedEmail', data: null };
    }
    const isUsedPhone = await Users.findOne({ phone, isDeleted: false });
    if (isUsedPhone) {
      return { code: 2, message: 'user.usedMobile' };
    }

    const salt = await bcrypt.genSalt(Number(SALT));
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await Users.create({
      name,
      email,
      phone,
      password: hashedPassword,
      country,
    });

    const accessToken = jwt.createAccessToken({
      id: user._id,
      role: user.role,
    });
    const refreshToken = jwt.createRefreshToken({
      id: user._id,
      role: user.role,
    });
    return {
      code: 0,
      message: 'commonSuccess.message',
      data: { accessToken, refreshToken, user },
    };
  } catch (error) {
    throw new Error(error);
  }
};

module.exports.login = async (data) => {
  try {
    const { email, password } = data;

    const user = await Users.findOne({ email, isDeleted: false });

    if (!user) {
      return { code: 2, message: 'user.incorrectIdORPassword', data: null };
    }

    const isCorrectPassword = await bcrypt.compare(password, user.password);
    if (!isCorrectPassword) {
      return { code: 2, message: 'user.incorrectIdORPassword', data: null };
    }

    const accessToken = jwt.createAccessToken({
      id: user._id,
      role: user.role,
    });
    const refreshToken = jwt.createRefreshToken({
      id: user._id,
      role: user.role,
    });

    await user.save();

    return {
      code: 0,
      message: 'commonSuccess.message',
      data: { accessToken, refreshToken, user },
    };
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

module.exports.sendCodeToEmail = async (data) => {
  const { _id } = data;
  try {
    const user = await Users.findOne({ _id, isDeleted: false });
    if (!user) {
      return { code: 1, message: 'user.notFoundUser', data: null };
    }
    const code = 123456; //TODO: MAKE IT RANDOM

    let verification = await Verification.findOne({
      userId: _id,
      email: user.email,
    });

    if (!verification) {
      verification = new Verification({ userId: _id, email: user.email });
      verification = await verification.save();
    }
    verification.verificationCode = code;
    await verification.save();

    await sendVerificationCodeEmail(user.email, code);

    return {
      code: 0,
      message: 'commonSuccess.message',
      data: { _id, email: user.email },
    };
  } catch (error) {
    throw new Error(error);
  }
};
