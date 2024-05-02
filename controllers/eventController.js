const model = require('../models/event');
const { DateTime } = require("luxon");
// exports.categories = function () {
//     let unique = events.map(item => item.category).filter((value, index, self) => self.indexOf(value) === index);
//     return unique;
//     }

exports.index = (req, res, next) => {
    // res.send('send all events');
    // res.send(model.find());
    
    // let categories = model.categories();
    model.find().populate('hostName', 'firstName lastName image')
    .then(events=>{
        model.distinct('category')
            .then(categories=> res.render('./event/index', {events, categories}))
            .catch(err=>next(err));
    })
    .catch(err=>next(err));
};

exports.new = (req, res) => {
    res.render('./event/new');
};



exports.create = (req, res, next)=>{
    //res.send('Created a new event');
    let event = new model(req.body); // create a new event document
    event.hostName = req.session.user;

    if (req.file) {
        let fileName = req.file.filename;
        event.image = fileName;

        
    }
    event.save() // insert the document to the database
    .then(event=> {
        req.flash('success', 'Event was created successfully!');
        res.redirect('/events')})
    .catch(err=>{
        if(err.name === 'ValidationError') {
            err.status = 400;
        }
        next(err);
    })
    
};
// exports.create = (req, res) => {
//     // res.send('Created a new event');
//     let event = req.body;
//     let filename = req.file.filename;
//     model.save(event, filename);
//     res.redirect('/events');
// };

exports.show = (req, res, next)=>{
    let id = req.params.id;

    Promise.all([model.findById(id).populate('hostName', 'firstName lastName'), rsvpModel.find({title: id, status: "YES"})])
    .then(results=>{
        if(results) {
            let [event, yeses] = results;
            let newStartDate =  DateTime.fromJSDate(event.startDateTime,{}).toLocaleString(DateTime.DATETIME_SHORT);
            let newEndDateTime = DateTime.fromJSDate(event.endDateTime,{}).toLocaleString(DateTime.DATETIME_SHORT);
            return res.render('./event/show', {event, newStartDate, newEndDateTime, yeses});
        } else {
            let err = new Error('Cannot find a event with id ' + id);
            err.status = 404;
            next(err);
        }
    })
    .catch(err=>{
        model.findById(id)
        .then(event=>{
            if(!event) {
                let err = new Error('Cannot find a event with id ' + id);
                err.status = 404;
                next(err);
            }
        })
})
};


// THIS WORKS
// exports.show = (req, res, next)=>{
//     let id = req.params.id;

//     model.find().populate('hostName', 'firstName lastName')
//     .then(events=>{
//         model.distinct('category')
//             .then(categories=> res.render('./event/index', {events, categories}))
//             .catch(err=>next(err));
//     })
//     .catch(err=>next(err));
// };


exports.edit = (req, res, next)=>{
    let id = req.params.id;
    if (req.file) {
        let fileName = req.file.filename;
        event.image = fileName;

        
    }

    model.findById(id)
    .then(event=>{
        if(event) {
            let convertedStartDateTime = DateTime.fromJSDate(event.startDateTime, {}).toISO({suppressMiliseconds: true, suppressSeconds: true, includeOffset: false});
            let convertedEndDateTime = DateTime.fromJSDate(event.endDateTime, {}).toISO({suppressMiliseconds: true, suppressSeconds: true, includeOffset: false});

            return res.render('./event/edit', {event, convertedStartDateTime, convertedEndDateTime});
        } else {
            let err = new Error('Cannot find a event with id ' + id);
            err.status = 404;
            next(err);
        }
    })
    .catch(err=>next(err));
};


exports.update = (req, res, next)=>{
    let event = req.body;
    let id = req.params.id;
    if (req.file) {
        let fileName = req.file.filename;
        event.image = fileName;

        
    }


    model.findByIdAndUpdate(id, event, {useFindAndModify: false, runValidators: true})
    .then(event=>{
        if(event) {
            req.flash('success', 'Event was updated successfully!');
            res.redirect('/events/'+id);
        } else {
           let err = new Error('Cannot find a event with id ' + id);
        err.status = 404;
        next(err);
        }
    })
    .catch(err=>{
        if(err.name === 'ValidationError')
            err.status = 400;
        next(err)
    });
};

exports.delete = (req, res, next)=>{
    let id = req.params.id;

    if(!id.match(/^[0-9a-fA-F]{24}$/)) {
        let err = new Error('Invalid event id');
        err.status = 400;
        return next(err);
    }

    model.findByIdAndDelete(id, {useFindAndModify: false})
    .then(() =>{
        rsvpModel.deleteMany({title: id})
        .then(()=>{
            req.flash('success', 'Event was deleted successfully!');
            res.redirect('/events');

        })
        .catch(()=>{
            let err = new Error('Cannot find a event with id ' + id);
            err.status = 404;
            return next(err);
    })
    .catch(err=>next(err));
})};


exports.status = (req, res, next)=>{
    let id = req.params.id; //event id

    


    model.findById(id)
    .then(event=> {
        let eventId = event.id;
        let userId = req.session.user._id;
        let buttonVal = req.body.rsvpButton //status
        let rsvp = {
            hostName: userId,
            title: eventId,
            status: buttonVal
        };
        
 
        rsvpModel.findOneAndUpdate({title: eventId, hostName: userId}, rsvp, {upsert: true, runValidators: true, useFindAndModify: false})

        .then(result=> {
            if(!result) {
                req.flash('success', 'RSVP was created successfully!');

            } else {
                req.flash('success', 'RSVP was updated successfully!');


            }
            req.session.save(()=>{
                res.redirect('/users/profile');;
            });

        })            

    })
    .catch(err=>next(err));
}
