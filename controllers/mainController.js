const model = require('../models/user');

exports.index = (req, res, next) => {
    let id = req.session.user;
    model.findById(id).populate('firstName', 'lastName image')

    .then(user=>{
             res.render('index', {user})
    })
    .catch(err=>next(err));
};

exports.about = (req, res) => {
    res.render('about');
};


exports.contact = (req, res) => {
    res.render('contact');
};