const express = require('express');
const controller = require('../controllers/calendarEventController');

const router = express.Router();

/// POST /events: create a new event
router.post('/', controller.create);

module.exports = router;
