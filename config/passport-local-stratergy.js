const passport = require("passport");
const LocalStratergy = require("passport-local").Strategy;
const User=require("../models/user");
//  this ia local passport strategy to suthenticate used as a middleware
// this is basic syntax
passport.use(new LocalStratergy({
    // need to  define the userfield whichis unique
    usernameField:'email',
    passReqToCallback:true
},
//  this is a call back function it has three field emails password and done 
//  what is done????.......
// called base on if success or error 
//  to set noty we need req but there is no req so we use 
// passReqToCallback:true
function (req,email, password, done) {
    User.findOne({ email: email })
        .then(user => {
            if (!user) {
                console.log("User not found");
                req.flash('error', 'invalid Username/password');
                return done(null, false);
            }
            if (user.password !== password) {
                console.log("Invalid password");
                req.flash('error', 'invalid Username/password');
                return done(null, false);
            }
            return done(null, user);
        })
        .catch(err => {
            console.log("Error in finding the user --> passport");
            return done(err);
        });
}))


// we need two more things deserialised user and serialised user 
// when we were manuala uthentication wee nedd to store in the cookie
// storing serialising 
//  taking out desearilising 

//  serialising to set id into the cookie

passport.serializeUser(function(user, done){
    done(null, user.id);
});

//  deserailise it 

passport.deserializeUser(async function(id, done){
    const user = await User.findById(id);
    if(user){
        return done(null, user);
    }
});


//  check if the user is authenticated
passport.checkAuthentication=function(req, res, next){
    // already build method
    if(req.isAuthenticated()){
        return next();
    }
    return res.redirect("/users/sign-in");
}

// set user to view 
passport.setAuthenticateUser = function (req, res, next) {
    // console.log(next());
    if (req.isAuthenticated()) {
        // req.user contains the current signed-in user; we are transferring it to the locals
        res.locals.user = req.user;
    }
    next();
};

module.exports=passport;