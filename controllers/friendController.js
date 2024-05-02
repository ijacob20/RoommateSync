const User = require('../models/user'); // Ensure you have a User model
// const Friend = require('../models/friend');


exports.index = (req, res) => {
    res.render('friend/roommate');
};




exports.friendList = async (req, res) => {
    try {
       
        const user = await User.findById(req.session.user.id)
            .populate('friends')
            .populate('friendRequests');

        const friendsList = user.friends ? user.friends : [];
        const friendRequests = user.friendRequests ? user.friendRequests : []; // Only incoming requests
        console.log(friendsList, friendRequests);

        res.render('friend/roommate', {
            friends: friendsList,
            friendRequests: friendRequests
        });
    } catch (error) {
        console.error('Error fetching friend information:', error);
        res.status(500).send(`Internal Server Error: ${error.message}`);
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


exports.addFriend = async (req, res) => {
    console.log(req.body.userId);

    const friendId = req.body.userId;
    const userId = req.session.user.id;
    console.log(`User ID ${userId} is adding Friend ID ${friendId}`);


    if (!friendId || !userId) {
        return res.status(400).json({ message: "Missing friendId or userId" });
    }

    // Log for debugging
    // console.log(`User ID ${userId} is adding Friend ID ${friendId}`);

    try {
        const friend = await User.findByIdAndUpdate(friendId,
            { $push: { friendRequests: userId } },
            { new: true, runValidators: true });

        if (!friend) {
            return res.status(404).json({ message: "Friend not found" });
        }
        res.json({ message: "Friend request sent", friend });
    } catch (err) {
        console.error('Failed to add friend:', err);
        res.status(500).json({ message: "Error adding friend", error: err.message });
    }
    res.redirect('/friend/roommate')
};





exports.acceptFriendRequest = async (req, res) => {
    const { requestId } = req.body; // Assuming requestId is the ID of the friend request to accept
    const userId = req.session.user; // The ID of the user accepting the request

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
    const userId = req.session.user;

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
    const userId = req.session.user;

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