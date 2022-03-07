const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');

//tell passport to use new strategy for google login
passport.use(new googleStrategy({
    clientID: "1054923790586-vjp7mmil9nspr7pdu7m5st75bqc20nco.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:8000/users/auth/google/callback"
    },
    function(accessToken, refreshToken, profile, done){
        //find user
        User.findOne({email: profile.emails[0].value}).exec(function(err, user){
            if(err){
                console.log('error in google strategy-passport', err);
                return;
            }

            console.log(profile);
            
            if(user){
                //if found set this user as req.user
                return done(null, user);
            }else{
                //if not found create user and set this as req.user
                User.create({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    password: crypto.randomBytes(20).toString('hex')
                }, function(err, user){
                    if(err){
                        console.log('error in google strategy-passport', err);
                        return;
                    }

                    return done(null, user);
                });
            }
        });
    } 
));

module.exports = passport;