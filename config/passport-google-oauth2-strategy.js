const passport=require('passport');
const googleStrategy=require('passport-google-oauth').OAuth2Strategy;
const crypto=require('crypto');
const User = require('../models/users');


passport.use(new googleStrategy({
    clientID: "1099443998647-ehc8921c5tiiubu9p4lv59u5a1s176vk.apps.googleusercontent.com",
    clientSecret: "80pY0Kq4n_6_d2oHQn2EKHZF",
    callbackURL: "http://localhost:8000/users/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOne({email:profile.emails[0].value}).exec(function(err,user){
        if (err) {
            console.log('error in google strategy'); return;
        }
        console.log(profile);
        if(user){
            return done(null,user);
        }else{
            User.create({
                name:profile.displayName,
                email: profile.emails[0].value,
                password:crypto.randomBytes(20).toString('hex')
            },function(err,user){
                if (err) {
                    console.log('error in google strategy'); return;
                }
                return done(null,user);
            });
        }
    })
  }
));
module.exports=passport