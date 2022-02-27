const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');

//authentication using passport
passport.use(new LocalStrategy({
        usernameField: 'email',
        passReqToCallback: true
    },
    function(req, email, password, done){
        //find a user and establish a identity
        User.findOne({email:email}, function(err, user){
            if(err){
                req.flash('error', err);
                return done(err);
            }

            if(!user || user.password!=password){
                req.flash('error', 'Invalid Username/Password');
                return done(null,false);
            }

            return done(null, user);
        });
    }
));

//serialize the user to decide which key to be kept in cookies
passport.serializeUser(function(user, done){
    done(null, user.id);
});

//deserialize user from key in the cookies
passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
        if(err){
            console.log('error in finding user --> passport');
            return done(err);
        }

        return done(null, user);
    });
});

//check is user is authenticated
passport.checkAuthentication = function(req, res, next){
    //if the user is signed in, then pass on the request to next function(controller's action)
    if(req.isAuthenticated()){
        return next();
    }

    //if the user is not signed in
    return res.redirect('/users/sign-in');
}

passport.setAuthenticatedUser = function(req, res, next){
    if(req.isAuthenticated()){
        //req.user contains the current signed in user from the session cookie, we're just sending it to local for views
        res.locals.user = req.user;
    }

    next();
}

module.exports = passport;