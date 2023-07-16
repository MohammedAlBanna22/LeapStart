const express = require('express');

const controller = require('../../../controller/session/user');
// post, put/change details, delete/
const router = express.Router();

router.post('/', controller.post);
router.put('/:id', controller.put);
router.delete('/:id', controller.cancel);

module.exports = router;
