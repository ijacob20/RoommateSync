const express = require('express');
const controller = require('../controllers/messagesController');
const {isGuest, isLoggedIn} = require('../middleware/auth');
const {loginLimiter} = require('../middleware/rateLimiters');
const {validateSignUp, validateLogIn, validateResult} = require('../middleware/validator');

const router = express.Router();

//GET /users/new: send html form for creating a message account
router.get('/new', isLoggedIn, controller.new);

router.post('/', controller.create);



module.exports = router;