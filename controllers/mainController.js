// const model = require('../models/user');

// exports.index = (req, res, next) => {
//     let id = req.session.user;
//     model.findById(id).populate('firstName', 'lastName image')

//     .then(user=>{
//              res.render('index', {user})
//     })
//     .catch(err=>next(err));

exports.index = (req, res) => {
    // res.send('send all events');
    // res.send(model.find());
    // let events = model.find();
    //res.render('index');
    res.redirect('/calendarEvents');
};
