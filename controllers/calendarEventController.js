const model = require('../models/calendarEvent');

// create export.create
// create export.(show/index) [Something to display the values already entered, this comes second]
// maybe use mainRoutes/Controller. Not sure but main.index opens up to the main menu file and you do not leave that page

exports.create = (req, res, next)=>{
    //res.send('Created a new event');
    //console.log('Created a new event');
    /* let calendarEvent = new model(req.body); // create a new event document
    calendarEvent.title = 'test not work';
    calendarEvent.description = 'test not work';
    
    calendarEvent.save() // insert the document to the database
    .then(calendarEvent=>{
        console.log(calendarEvent);
        req.flash('success', 'Calendar event has been created successfully');
    })
    .catch(err=>{
        next(err);
    }); */

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

