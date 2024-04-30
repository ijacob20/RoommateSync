exports.index = async (req, res, next)=>{
    // console.log(req.session.user);
    try {
        
        let messages= await req.app.messageModel.find({userId: req.session.user._id})
        return res.render('./message/index', {messages});
    
}catch(err) {
    next(err);
} 
};



exports.new =  (req, res, next)=>{    
        return res.render('./message/new');
    
};
 

