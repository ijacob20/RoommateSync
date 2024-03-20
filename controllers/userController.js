const User = require('../models/user');

exports.new = (req, res) => {
    return res.render('./user/new');
};

exports.create = (req, res, next) => {
    let user = new User(req.body);
    user.save()
    .then(()=>{
        req.flash('success', 'Registration succeded!');
        res.redirect('/users/login');
    })
    .catch(err=>{
        if(err.name === 'ValidationError') {
            req.flash('error', err.message);
            return res.redirect('/users/new');
        }
        if(err.code === 11000) {
            req.flash('error', 'Email address has been used');
            return res.redirect('/users/new');
        }
        next(err);
    });
};

exports.getUserLogin = (req, res) => {
    res.render('./user/login');
};

exports.login = (req, res, next) => {
    //authenticate user's login request
    let email = req.body.email;
    let password = req.body.password;

    //get the user that matches the email
    User.findOne({email: email})
    .then(user=>{
        if (!user) {
            console.log('wrong email address');
            req.flash('error', 'Incorrect email address!');  
            res.redirect('/users/login');
            } else {
            user.comparePassword(password)
            .then(result=>{
                if(result) {
                    req.session.user = {id: user._id, firstName: user.firstName};
                    req.flash('success', 'You have successfully logged in');
                    res.redirect('/users/profile');
            } else {
                req.flash('error', 'Incorrect password!');      
                res.redirect('/users/login');
            }
            });     
        } 
    })
    .catch(err=>next(err));
};

// exports.profile = (req, res, next)=>{
//     let id = req.session.user.id;
//     Promise.all([User.findById(id), Event.find({host: id})]) 
//     .then(results=> {
//         const [user, events] = results;
//         res.render('./user/profile', {user, events})
//     })
//     .catch(err=>next(err));
// };

exports.logout = (req, res, next) => {
    req.session.destroy(err=>{
        if(err) {
            return next(err);
        } else {
            res.redirect('/');
        }
    });
};


