const { OK, CONTINUE, CREATED, NO_CONTENT } = require('../../httpCodes');
const { GeneralSuccess } = require('./generalSuccess');

class Success extends GeneralSuccess {
  constructor(message, data = undefined) {
    super(message, OK, data);
  }
}

class Created extends GeneralSuccess {
  constructor(message, data = undefined) {
    super(message, CREATED, data);
  }
}

class NoContent extends GeneralSuccess {
  constructor(message, data = undefined) {
    super(message, NO_CONTENT, data);
  }
}

class Continue extends GeneralSuccess {
  constructor(message, data = undefined) {
    super(message, CONTINUE, data);
  }
}

/**
 *
 * @type {{
 * Success: Success,
 * Created: Created,
 * Created: NoContent,
 * waiting:Continue,
 * }}
 */
module.exports = {
  Success,
  Created,
  NoContent,
  Continue,
};
