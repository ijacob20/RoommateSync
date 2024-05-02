const express = require('express');
const controller = require('../controllers/mainController');
const router = express.Router();
const {isGuest, isLoggedIn} = require('../middleware/auth');



router.get('/', isLoggedIn, controller.index);


module.exports = router;