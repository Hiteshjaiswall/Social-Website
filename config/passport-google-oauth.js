
//  importe passport to be used
const passport = require('passport');
//  this is a google stratergie
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
//  now we need crypto to generate random password for the authentication for the user to sign in 
const crypto = require('crypto');
const User = require('../models/user');
passport.use(new GoogleStrategy({
    //  these all are created on the google api 
    //  this is client id
    clientID: '1065205149208-dv98sq8upne9frnjvtqonu1aiooe4987.apps.googleusercontent.com',
    clientSecret: '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',
    // this is callback url this is once the user is authenticate in the google database it would redirect it to the callback url hten the server woould handel the data
    callbackURL: 'http://localhost:5000/users/auth/google/callback',

},
    function (accesstoken, refreshtoken, profile, done) {
        User
        .findOne({email:profile.emails[0].value})
        .then(user=>{
            console.log(profile);
            if(user){
            return done(null, user)
            }else{
                User.create({
                    name:profile.displayName,
                    email:profile.emails[0].value,
                    password:crypto.randomBytes(20).toString('Hex')
                })
                .then(user=>{
                    //  send as req.user
                    // sign in that user
                    return done(null, user);
                })
                .catch(err=>{
                    console.log("error in creating user", err);
                return;
                })
            }
        })
        .catch(err=>{
            console.log("error in google passport", err);
        return;
        })
    }
));


module.exports=passport;