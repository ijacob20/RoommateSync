const express = require('express');
const controller = require('../controllers/userController');
const {fileUpload} = require('../middleware/fileUpload');
const {isGuest, isLoggedIn} = require('../middleware/auth');
const {loginLimiter} = require('../middleware/rateLimiters');
const {validateSignUp, validateLogIn, validateResult} = require('../middleware/validator');



const router = express.Router();

//GET /users/new: send html form for creating a new user account
router.get('/new', isGuest, controller.new);

//POST /users: create a new user account
router.post('/', isGuest, validateSignUp, validateResult, controller.create);

//GET /users/login: send html for logging in
router.get('/login', isGuest, controller.getUserLogin);

//POST /users/login: authenticate user's login
router.post('/login', loginLimiter, isGuest, validateLogIn, validateResult, controller.login);

//GET /users/profile: send user's profile page
router.get('/profile', controller.profile);

// GET /users/edit: send user edit page
router.get('/edit', controller.editPage);

//POST /users/profile update user profile    
//EITHER POST OR PUT
router.post('/profile', fileUpload, controller.edit);

//POST /users/logout: logout a user
router.get('/logout', isLoggedIn, controller.logout);

module.exports = router;