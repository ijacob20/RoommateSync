const User = require('../models/user'); // Ensure you have a User model



exports.index = (req, res) => {
    res.render('roommates');
};

exports.friendList = async (req, res) => {
    try {
        // This is a mock setup, replace with actual logic to get friend requests and friends.
        const friendRequests = []; // Replace with actual friend request data retrieval logic
        const friends = await User.findById(req.session.userId).populate('friends'); // Modify as needed

        res.render('friend/roommate', { friendRequests, friends: friends ? friends.friends : [] });
    } catch (error) {
        console.error('Error fetching friend information:', error);
        res.status(500).render('error', { error: 'Error fetching friend information' });
    }
};

exports.searchFriends = async (req, res) => {
    const searchTerm = req.query.search;
    try {
        const users = await User.find({
            "$or": [
                { "firstName": { "$regex": searchTerm, "$options": "i" } },
                { "lastName": { "$regex": searchTerm, "$options": "i" } }
            ]
        });
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: "Error finding users" });
    }
};

exports.addFriend = async (req, res) => {
    const { userId } = req.body;
    const userToAdd = await User.findById(userId);
    if (!userToAdd) {
        return res.status(404).json({ message: "User not found" });
    }
    // Assuming you have a method to add a friend or a friends array in the User schema
    try {
        // Example logic for adding a friend
        const user = await User.findById(req.session.userId);
        user.friends.push(userToAdd._id);
        await user.save();
        res.json({ message: "Friend added successfully" });
    } catch (err) {
        res.status(500).json({ message: "Error adding friend" });
    }
};
