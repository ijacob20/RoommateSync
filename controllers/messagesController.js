const userModel = require('../models/user');


exports.index = async (req, res, next)=>{
    // console.log(req.session.user);
    try {
        
        let [messages, users]= await Promise.all([
                                req.app.messageModel.find({userId: req.session.user._id}),
                                userModel.find()
                                    ]);
        return res.render('./message/index', {messages, users});
    
}catch(err) {
    next(err);
} 
};

exports.messaging = async (req, res, next)=>{    
    let id = req.params.id;
    let myId = req.session.user._id;
    console.log(id);
    try {
        let messages = await req.app.messageModel.find({
            $or: [
            {userId: myId, receiver: id},
            {userId: id, receiver: myId}
            ]})
        return res.render('./message/directMessage', {messages});


    } catch(err) {
        next(err);
    }

};



exports.new =  (req, res, next)=>{    
        return res.render('./message/new');
    
};
 

