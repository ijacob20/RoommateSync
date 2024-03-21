const express = require('express');
const controller = require('../controllers/mainController');
const router = express.Router();

router.get('/', controller.index);

router.get('/message', controller.message);

module.exports = router;