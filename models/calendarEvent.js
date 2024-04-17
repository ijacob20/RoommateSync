const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const calendarEventSchema = new Schema({
    title: {type: String, required: [true, 'title is required']},
    description: {type: String, required: [true, 'desc is required']}
}
);

module.exports = mongoose.model('CalendarEvent', calendarEventSchema);

/* const CalendarEvent = mongoose.model('CalendarEvent', calendarEventSchema);
let calendarEvent = new CalendarEvent({
    title: 'test',
    description: 'test1'
});

calendarEvent.validate()
.then(()=>{
    console.log('validated successfully');
})
.catch(err=>console.log(err.message));

console.log(calendarEvent); */