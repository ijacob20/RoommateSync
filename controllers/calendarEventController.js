const model = require('../models/calendarEvent');

// create export.create
// create export.(show/index) [Something to display the values already entered, this comes second]
// maybe use mainRoutes/Controller. Not sure but main.index opens up to the main menu file and you do not leave that page

exports.create = (req, res, next)=>{
    console.log(req.body);
    let calendarEvent = new model(req.body)
    calendarEvent.save()
    .then((calendarEvent)=>{
        console.log(calendarEvent);
        res.redirect('/calendarEvents')
    })
    .catch(err=>{
        next(err);
    })
};