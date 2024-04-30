const express = require('express');
const controller = require('../controllers/choreController');
const {isLoggedIn} = require('../middleware/auth');
const router = express.Router();

//GET /: send all chores to user
router.get('/', controller.index);

//GET /active: send chores in progress
router.get('/active', controller.active);

//GET /assigned: send chores assigned to other users
router.get('/assigned', controller.assigned);

//GET /completed: send completed chores
router.get('/completed', controller.completed);

//POST /events: create a new chore
router.post('/', isLoggedIn, controller.create);

//PUT /chore/:id update the chore identified by id
router.put('/:id', isLoggedIn, controller.update);

//DELETE /chores/:id delete the chore identified by id
router.delete('/:id', isLoggedIn, controller.delete);

module.exports = router;