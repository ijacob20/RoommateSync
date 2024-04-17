const model = require('../models/main');

exports.index = (req, res) => {
    //res.send('send all events');
    //console.log('send all events');
    //res.send(model.find());
    // let events = model.find();
    res.render('index');
};

/* exports.addEvent = (req, res) =>{
    
} */

exports.about = (req, res) => {
    res.render('about');
};


exports.contact = (req, res) => {
    res.render('contact');
};

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
        res.redirect('/mains/about')
    })
    .catch(err=>{
        next(err);
    })
};

