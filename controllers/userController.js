const model = require('../models/user');
const Event = require('../models/event');
const userService = require('../models/userService');

exports.new = (req, res) => {
    return res.render('./user/new');
};

exports.create = (req, res, next) => {
    let user = new model(req.body);
    user.save()
        .then(user => {
            req.flash('success', 'Registration successful!');
            res.redirect('/users/login')
        })
        .catch(err => {
            if (err.name === 'ValidationError') {
                req.flash('error', err.message);
                return res.redirect('/users/new');
            }

            if (err.code === 11000) {
                req.flash('error', 'Email has been used');
                return res.redirect('/users/new');
            }

            next(err);
        });



};

exports.getUserLogin = (req, res, next) => {
    return res.render('./user/login');
}

exports.login = (req, res, next) => {
    let email = req.body.email;
    let password = req.body.password;
    model.findOne({ email: email })
        .then(user => {
            if (!user) {
                console.log('wrong email address');
                req.flash('error', 'wrong email address');
                res.redirect('/users/login');
            } else {
                user.comparePassword(password)
                    .then(result => {
                        if (result) {
                            req.session.userId = user._id;  // Make sure this is set
                            req.session.user = { _id: user._id, firstName: user.firstName }; // Optional: Maintain this if used elsewhere
                            req.flash('success', 'You have successfully logged in');
                            res.redirect('/');
                        } else {
                            req.flash('error', 'wrong password');
                            res.redirect('/users/login');
                        }
                    });
            }
        })
        .catch(err => next(err));
};




exports.profile = (req, res, next) => {
    let id = req.session.user;
    Promise.all([model.findById(id), Event.find({ hostName: id })])
        .then(results => {
            const [user, events] = results;
            res.render('./user/profile', { user, events });

        })
        .catch(err => next(err));
};

// function within a controller when  need to update a user's status.
exports.updateStatus = (req, res) => {
    const userId = req.session.userId;
    const status = req.body.status;

    userService.setUserStatus(userId, status)
        .then(user => {
            // Handle success, such as sending a response or emitting a socket event
            res.json({ message: 'Status updated successfully', status: user.status });
        })
        .catch(err => {
            // Handle errors
            console.error('Error updating user status', err);
            res.status(500).json({ message: 'Error updating status' });
        });
};


exports.logout = (req, res, next) => {
    req.session.destroy(err => {
        if (err)
            return next(err);
        else
            res.redirect('/');
    });

};



