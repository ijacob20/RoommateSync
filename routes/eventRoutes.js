const express = require('express');
const controller = require('../controllers/eventController');
const {isLoggedIn, isHostName, isNotHost} = require('../middleware/auth');
const {validateId, validateResult, validateEvent} = require('../middleware/validator');
const {fileUpload} = require('../middleware/fileUpload');


const router = express.Router();

// GET /events: send all events to the user

router.get('/', controller.index);

// GET /events/new: send html form for creating a new event

router.get('/new', isLoggedIn, controller.new);

// POST /events: create a new event
// add middleare fileupload
router.post('/', isLoggedIn, fileUpload, validateEvent, validateResult, controller.create);


// GET /events/:id: send details of event identified by id

router.get('/:id', validateId, controller.show);


// GET /events:id/edit: send html form for editing an existing event

router.get('/:id/edit', validateId, isLoggedIn, isHostName, controller.edit);

// PUT /events/:id: update the event identified by id
// add middleware fileupload
router.put('/:id', validateId, isLoggedIn, isHostName, fileUpload, validateResult, controller.update);

// DELETE /events/id:, delete the event identified by id

router.delete('/:id', validateId, isLoggedIn, isHostName, controller.delete);

module.exports = router;