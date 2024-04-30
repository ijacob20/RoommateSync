const express = require('express');
const router = express.Router();
const friendController = require('../controllers/friendController');

router.get('/', friendController.index);

router.get('/friend', friendController.friendList);

// Route for searching friends
router.get('/search-friends', friendController.searchFriends);

// Route for adding a friend
router.post('/add-friend', friendController.addFriend);

// Route for accept a friend
router.post('/accept-friend-request', friendController.acceptFriendRequest);

// Route for decline a friend
router.post('/decline-friend-request', friendController.declineFriendRequest);

// Route for remove a friend
router.post('/remove-pending-request', friendController.removePendingRequest);

module.exports = router;
