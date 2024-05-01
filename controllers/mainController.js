exports.index = (req, res) => {
    // res.send('send all events');
    // res.send(model.find());
    // let events = model.find();
    //res.render('index');
    res.redirect('/calendarEvents');
};

exports.about = (req, res) => {
    res.render('about');
};


exports.contact = (req, res) => {
    res.render('contact');
};