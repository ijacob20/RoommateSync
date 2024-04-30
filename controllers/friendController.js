const User = require('../models/user'); // Ensure you have a User model



exports.index = (req, res) => {
    res.render('roommates');
};


exports.friendList = async (req, res) => {
    try {
        const user = await User.findById(req.session.userId).populate('friends');
        const friendsList = user && user.friends ? user.friends : [];
        res.render('friend/roommate', { friends: friendsList });
    } catch (error) {
        console.error('Error fetching friend information:', error);
        return res.status(500).send('Internal Server Error');
    }
};



exports.searchFriends = async (req, res) => {
    const searchTerm = req.query.search;
    try {
        const users = await User.find({
            "$or": [
                { "firstName": new RegExp(searchTerm, "i") },
                { "lastName": new RegExp(searchTerm, "i") }
            ]
        }).exec();
        res.json(users);
    } catch (err) {
        console.error('Error finding users:', err);
        res.status(500).json({ message: "Error finding users", error: err.message });
    }
};

// friendController.js
exports.addFriend = async (req, res) => {
    const { friendId } = req.body;
    const userId = req.session.userId; // The current logged-in user

    try {
        // Add the friend's ID to the user's pendingRequests
        await User.findByIdAndUpdate(userId, { $push: { pendingRequests: friendId } }, { new: true });

        // Add the user's ID to the friend's friendRequests
        await User.findByIdAndUpdate(friendId, { $push: { friendRequests: userId } }, { new: true });

        res.json({ message: "Friend request sent" });
    } catch (err) {
        res.status(500).json({ message: "Error adding friend", error: err.message });
    }
};


exports.acceptFriendRequest = async (req, res) => {
    const { requestId } = req.body; // Assuming requestId is the ID of the friend request to accept
    const userId = req.session.userId; // The ID of the user accepting the request

    try {
        await User.findByIdAndUpdate(userId,
            { $pull: { friendRequests: requestId }, $addToSet: { friends: requestId } },
            { new: true }
        );

        await User.findByIdAndUpdate(requestId,
            { $pull: { pendingRequests: userId }, $addToSet: { friends: userId } },
            { new: true }
        );

        res.json({ success: true, message: "Friend request accepted" });
    } catch (err) {
        res.status(500).json({ success: false, message: "Error accepting friend request", error: err.message });
    }
};

exports.declineFriendRequest = async (req, res) => {
    const { requestId } = req.body;
    const userId = req.session.userId;

    try {
        // Decline the friend request logic
        await User.findByIdAndUpdate(userId,
            { $pull: { friendRequests: requestId } },
            { new: true }
        );

        res.json({ success: true, message: "Friend request declined" });
    } catch (err) {
        res.status(500).json({ success: false, message: "Error declining friend request", error: err.message });
    }
};

exports.removePendingRequest = async (req, res) => {
    const { requestId } = req.body;
    const userId = req.session.userId;

    try {
        // Remove the pending request logic
        await User.findByIdAndUpdate(userId,
            { $pull: { pendingRequests: requestId } },
            { new: true }
        );

        res.json({ success: true, message: "Pending request removed" });
    } catch (err) {
        res.status(500).json({ success: false, message: "Error removing pending request", error: err.message });
    }
};