const model = require('../models/calendarEvent');
//const { addChore } = require('../public/js/calendar');


// sends the event to the database
exports.create = async(req, res, next)=>{
    //res.send('send the edit form')
    console.log(req.body);
    let calendarEvent = new model(req.body)

    calendarEvent.save()
    .then((calendarEvent)=>{
        console.log(calendarEvent);
        
        res.redirect('/calendarEvents');
    })
    .catch(err=>{
        next(err);
    })
};

exports.show = async(req, res, next)=>{
    let id = req.params.id;
    //res.send(model);
    //res.send('test');
    //res.send(id);
    try{
        
        // The events in the DB are being send to the ejs file
        // Not sure how to display on the correct dates
        const [calendarEvents] = await Promise.all([model.find({})]);
        res.render('./partials/header.ejs', {calendarEvents});
        
    }catch(err){
        next(err);
    }
}