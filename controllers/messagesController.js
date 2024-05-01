const userModel = require('../models/user');


exports.index = async (req, res, next)=>{
    // console.log(req.session.user);
    try {
        
        let [messages, users]= await Promise.all([
                                req.app.messageModel.find({sender: req.session.user._id}),
                                userModel.find()
                                    ]);
        return res.render('./message/index', {messages, users});
    
}catch(err) {
    next(err);
} 
};

exports.messaging = async (req, res, next)=>{    
    let id = req.params.id;
    console.log('This is the id' + id)
    let myId = req.session.user;
    console.log('This is the myId' + myId)
    try {
        let messages = await req.app.messageModel.find({
            $or: [
            {sender: myId, receiver: id},
            {sender: id, receiver: myId}
            ]})
            .populate('sender', 'firstName lastName profile')
            console.log(messages)
        return res.render('./message/directMessage', {messages});


    } catch(err) {
        next(err);
    }

};



exports.new =  (req, res, next)=>{    
        return res.render('./message/new');
    
};
 

