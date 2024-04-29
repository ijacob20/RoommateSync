const model = require('../models/main');
const Calendar = require('../models/calendarEvent');

exports.index = async(req, res) => {
    let id = req.params.id;
    //res.send('send all events');
    //console.log('send all events');
    //res.send(model.find());
    // let events = model.find();
    /* try{
        const [calendarEvents] = await Promise.all([Calendar.findById(id)]);
        res.render('./partials/header.ejs', {calendarEvents});
    }catch(err){
        next(err);
    }
    res.send(Calendar.findById(id)); */
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

