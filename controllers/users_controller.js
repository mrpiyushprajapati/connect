const User = require('../models/user')

//render profile page
module.exports.profile = function(req, res){
    // return res.end('<h1>user profiles if up</h1>')

    return res.render('profile', {
        title: 'Profile'
    });
}

//render sign in page
module.exports.signIn = function(req, res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }

    return res.render('user_sign_in',{
        title: 'Sign in'
    });
}

//render sign up page
module.exports.signUp = function(req, res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }

    return res.render('user_sign_up',{
        title: 'Sign up'
    });
}

//get the sign up data
module.exports.create = function(req, res){
    console.log(req.body)
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back')
    }

    User.findOne({email:req.body.email}, function(err, user){
        if(err){
            console.log('error in finding user in signing in');
            return;
        }
        if(!user){
            User.create(req.body, function(err, user){
                console.log('error in creating user while signing up');

                return res.redirect('/users/sign-in');
            })
        }
        else{
            return res.redirect('back');
        }
    })
}

//sign in and create a session for the user
module.exports.createSession = function(req, res){
    return res.redirect('/');
}

module.exports.destroySession = function(req, res){
    req.logout();

    return res.redirect('/');
}