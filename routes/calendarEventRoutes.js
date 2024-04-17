const express = require('express');
const controller = require('../controllers/calendarEventController');

const router = express.Router();

/// POST /events: create a new event
router.post('/', controller.create);

module.exports = router;

/* const CalendarEvent = mongoose.model('CalendarEvent', calendarEventSchema);
let calendarEvent = new CalendarEvent({
    title: 'test',
    description: 'test1'
});

create(calendarEvent);

console.log(calendarEvent); */