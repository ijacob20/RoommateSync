//GET /: send home page to the user
exports.index = (req, res) => {
    res.render('index');
};

//GET /: send message page to the user
exports.message = (req, res) => {
    res.render('message');
};