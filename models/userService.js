const User = require('../models/user');

// This file will contain functions that perform operations on the User model, such as updating the user's status
exports.setUserStatus = function (userId, status) {
    return User.findByIdAndUpdate(userId, { status: status }, { new: true }).exec();
};