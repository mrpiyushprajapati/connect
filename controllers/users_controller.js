const User = require('../models/user');
const fs = require('fs');
const path = require('path');

//render profile page
module.exports.profile = function(req, res){
    // return res.end('<h1>user profiles if up</h1>')
    User.findById(req.params.id, function(err, user){
        return res.render('user_profile', {
            title: 'User profile',
            profile_user: user
        });
    });
}

module.exports.update = async function(req, res){
    if(req.user.id == req.params.id){
        try {
            // User.findByIdAndUpdate(req.params.id, req.body, function(err, user){
            //     req.flash('success', 'Updated details!')
            //     return res.redirect('back');
            // });
            let user = await User.findById(req.params.id);
            User.uploadedAvatar(req, res, function(err){
                if(err){
                    console.log('***multer error', err);
                    return;
                }

                user.name = req.body.name;
                user.email = req.body.email;

                if(req.file){

                    if(user.avatar){
                        fs.unlinkSync(path.join(__dirname, '..', user.avatar));
                    }
                    //saving file name of uploaded image in avatar field in user
                    user.avatar = User.avatarPath + '/' + req.file.filename;
                }

                user.save();
                return res.redirect('back');
            });
        } catch (error) {
            req.flash('error', error);
            return res.redirect('back');
        }
    }else{
        return res.status(401).send('Unauthorized');
    }
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
            console.log('Error', err);
            return;
        }
        if(!user){
            User.create(req.body, function(err, user){
                return res.redirect('/users/sign-in');
            })
        }
        else{
            console.log('error in creating user while signing up');
            return res.redirect('back');
        }
    })
}

//sign in and create a session for the user
module.exports.createSession = function(req, res){
    req.flash('success', 'Logged in successfully!');
    return res.redirect('/');
}

module.exports.destroySession = function(req, res){
    req.logout();
    req.flash('success', 'Logged out successfully!');

    return res.redirect('/');
}