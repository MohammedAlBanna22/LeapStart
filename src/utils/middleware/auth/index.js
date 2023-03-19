const isAuthenticated = require('./auth');
const { AccessDenied } = require('../../response/error/errors');

/**
 *
 * @param roleId
 * @returns {function(*=, *=, *): Promise<*|undefined>}
 */
module.exports.isAuthenticatedRole = (roleId) => async (req, res, next) => {
  await isAuthenticated(req, res, (error) => {
    if (!error) {
      if (req.user && req.user.role === roleId) {
        return next();
      }
      return next(new AccessDenied('Access denied'));
    }
    return next(error);
  });
};

module.exports.isAuthenticatedVerified = async (req, res, next) => {
  await isAuthenticated(req, res, (error) => {
    if (!error) {
      if (req.user && req.user.verifiedEmail && req.user.verifiedMobile) {
        return next();
      }
      return next(new AccessDenied('Access denied for unverified user'));
    }
    return next(error);
  });
};
