/**
 *
 * @param success type of GeneralSuccess
 * @param req
 * @param res
 * @returns {*}
 */
module.exports.handleSuccess = (success, req, res) => {
  const { data, statusCode, message } = success;

  return res.status(statusCode).json({
    statusCode,
    status: 'success',
    message: message ? req.t(message) : null,
    data: typeof data === 'string' ? req.t(data) : data,
  });
};
