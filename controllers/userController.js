const model = require('../models/user');
// const Event = require('../models/event');
const Chore = require('../models/chore');

exports.new = (req, res)=>{
    return res.render('./user/new');
};

exports.create = (req, res, next)=>{
        let user = new model(req.body);
        user.save()
        .then(user=> {
            req.flash('success', 'Registration successful!');
             res.redirect('/users/login')})
        .catch(err=>{
            if(err.name === 'ValidationError' ) {
                req.flash('error', err.message);  
                return res.redirect('/users/new');
            }
    
            if(err.code === 11000) {
                req.flash('error', 'Email has been used');  
                return res.redirect('/users/new');
            }
            
            next(err);
        }); 


   
};

exports.getUserLogin = (req, res, next) => {
        return res.render('./user/login');
}

exports.login = (req, res, next)=>{
        let email = req.body.email;
        let password = req.body.password;
        model.findOne({ email: email })
        .then(user => {
            if (!user) {
                console.log('wrong email address');
                req.flash('error', 'Could not find this RoommateSync account');  
                res.redirect('/users/login');
                } else {
                user.comparePassword(password)
                .then(result=>{
                    if(result) {
                        req.session.user = {_id: user._id, id: user._id, firstName: user.firstName, lastName: user.lastName, email: user.email, image: user.image};
                        req.flash('success', 'You have successfully logged in');
                        res.redirect('/')

                } else {
                    req.flash('error', 'Wrong password. Please try again');      
                    res.redirect('/users/login');
                }
                });     
            }     
        })
        .catch(err => next(err));
};

exports.profile = (req, res, next)=>{
    let id = req.session.user;
    Promise.all([model.findById(id), Chore.find({assignTo: id})])
    .then(results=>{
        const [user, chores] = results;
        res.render('./user/profile', {user, chores});

    })
    .catch(err=>next(err));
};

exports.editPage= (req, res, next)=>{
    let id = req.session.user;
    model.findById(id)
    .then(user=>{      
            req.flash('success', 'You have successfully edited your profile.');
            return res.render('./user/edit', {user});
    })
    .catch(err=>next(err));
};

exports.edit = (req, res, next)=>{

    let user = req.body;
    let id = req.session.user;
    console.log(req.file);

    if (req.file) {
        user.image = '/images/'+req.file.filename;

    }

    model.findByIdAndUpdate(id, user, {useFindAndModify: false, runValidators: true})
    .then(user=>{
            req.flash('success', 'You have successfully updated your profile');
            res.redirect('/users/profile');
    })
    .catch(err=> {
        if(err.name === 'ValidationError')
            err.status = 400;
        next(err);
    });
};


exports.logout = (req, res, next)=>{
    req.session.destroy(err=>{
        if(err) 
           return next(err);
       else
            res.redirect('/');  
    });
   
 };



