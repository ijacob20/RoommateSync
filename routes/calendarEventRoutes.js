const express = require('express');
const controller = require('../controllers/calendarEventController');

const router = express.Router();

/// POST /calendarEvents: create a new event
router.post('/', controller.create);

// GET /calendarEvents: displays the events on their date
router.get('/', controller.show);

module.exports = router;
