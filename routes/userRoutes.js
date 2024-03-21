const express = require('express');
const controller = require('../controllers/userController');
//const {isGuest, isLoggedIn} = require('../middlewares/auth');
const router = express.Router();

//GET /users/new: get the new user form
//router.get('/new', isGuest, controller.new);
router.get('/new');

//POST /users: create a new user
//router.post('/', isGuest, controller.create);

//GET /users/login: get the login form
//router.get('/login', isGuest, controller.getUserLogin);

//POST /users: authenticate user's login 
//router.post('/login', isGuest, controller.login);

//GET /users/profile: get the profile page
//router.get('/profile', isLoggedIn, controller.profile);
router.get('/profile');

//GET /users/logout: logout the user
//router.get('/logout', isLoggedIn, controller.logout);
router.get('/logout');

module.exports = router;