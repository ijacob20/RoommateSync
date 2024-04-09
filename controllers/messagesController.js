const messagesModel = require('../models/messages');

exports.new = (req, res)=>{
    return res.render('./message/new');
};

exports.create = (req, res, next)=>{
    let userId = req.session.user._id;
    let textMessage = req.body.text;

    console.log(userId);
    console.log(textMessage);

    let newMessage = new messagesModel({
        sender: userId,
        text: textMessage,
    });

    newMessage.save()
    .then(user=> {
        req.flash('success', 'message save was successful!');
        //  res.redirect('/messages/new')
        })
    .catch(err=>{
        req.flash('success', 'message save was NOT successful!');
        next(err);
    }); 



};