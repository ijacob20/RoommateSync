const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const calendarEventSchema = new Schema({
    title: {type: String, required: [true, 'title is required']},
    description: {type: String, required: [true, 'desc is required']}
}
);

module.exports = mongoose.model('CalendarEvent', calendarEventSchema);