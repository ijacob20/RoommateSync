const express = require('express');
const router = express.Router();
const friendController = require('../controllers/friendController');

router.get('/', friendController.index);

// Route for searching friends
router.get('/search-friends', friendController.searchFriends);

// Route for adding a friend
router.post('/add-friend', friendController.addFriend);

module.exports = router;
