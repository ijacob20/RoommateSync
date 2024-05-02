const { body } = require('express-validator');
const { validationResult } = require('express-validator');


exports.validateId = (req, res, next) => {
    let id = req.params.id;
    //an objectId is a 24-bit Hex string
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
        return next();
    } else {
        let err = new Error('Invalid event id');
        err.status = 400;
        return next(err);
    }
}

exports.validateSignUp = [body('firstName', 'First name is required').notEmpty().trim().escape(),
body('lastName', 'Last name is required').notEmpty().trim().escape(),
body('email').trim().escape().notEmpty().withMessage('Email is required')
    .if(body('email').notEmpty()).isEmail().withMessage('Email is not valid').normalizeEmail(),

body('password', 'Password must be atleast 8 characters and at most 64 characters').isLength({ min: 8, max: 64 }).trim()];

exports.validateLogIn = [body('email').trim().escape().notEmpty().withMessage('Email is required')
    .if(body('email').notEmpty()).isEmail().withMessage('Email is not valid').normalizeEmail(),

body('password', 'Password must be atleast 8 characters and at most 64 characters').isLength({ min: 8, max: 64 }).trim()];

exports.validateResult = (req, res, next) => {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        errors.array().forEach(error => {
            req.flash('error', error.msg);
        });
        return res.redirect('back');
    } else {
        return next();
    }
}

exports.validateEvent = [body('title', 'Title is required').notEmpty().trim().escape(),
body('category').notEmpty().withMessage('Category is required')
    .if(body('category').notEmpty()).isIn(['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']).withMessage('Category must be either: Solo, Duo, Trio, Quads, or Other').trim().escape()];

