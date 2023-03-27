const { Users } = require('../../../model');
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
