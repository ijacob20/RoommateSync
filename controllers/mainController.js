exports.index = (req, res) => {
    // res.send('send all events');
    // res.send(model.find());
    // let events = model.find();
    res.render('index');
};

exports.messages = (req, res) => {
    res.render('messages');
};


exports.contact = (req, res) => {
    res.render('contact');
};