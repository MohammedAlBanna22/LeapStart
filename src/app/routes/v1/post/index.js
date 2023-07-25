const express = require('express');
const controller = require('../../../controller/post');
const isAuthenticated = require('../../../../utils/middleware/auth/auth');
const router = express.Router();


router.post('/',isAuthenticated, controller.Create);
router.get('/getpost/:id', controller.getPost);///getuser/:_id
router.get('/:id',isAuthenticated,controller.getPosts);
//router.put('/:id', controller.put);
router.post('/:id',isAuthenticated, controller.delete);


module.exports = router;

