const express = require('express');
const controller = require('../controllers/mainController');
const router = express.Router();
const {isGuest, isLoggedIn} = require('../middleware/auth');



router.get('/', isLoggedIn, controller.index);

router.get('/messages', controller.messages);

router.get('/contact', controller.contact);

module.exports = router;