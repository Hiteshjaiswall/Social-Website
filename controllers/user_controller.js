//import model 
const User = require('../models/user');
module.exports.profile = function (req, res) {
    // return res.end("<h1>User Profile</h1>");
    return res.render('user_profile.ejs', {
        title: "soical website"
    })
}
// rendering the sign up page 
module.exports.signup = function (req, res) {
    return res.render("user_signup", {
        title: "Social | Sign-up"
    })
}
// rendering the sign in page
module.exports.signin = function (req, res) {
    return res.render("user_signin", {
        title: "Social | Sign-in"
    })
}
// for the sign up we need to creat session
module.exports.create = async function (req, res) {
    try {
        // Check if the password and the confirm password match; if not, redirect back to the user
        if (req.body.password != req.body.confirm_password) {
            console.log("incorrect password");
            return res.redirect('back');
        }
        // Find user by email
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            // Create a new user
            console.log("inside user");
            User.create(req.body);
            return res.redirect('/users/sign-in');
        } else {
            console.log("inside else");
            return res.redirect('back');
        }
    } catch (err) {
        console.error("Error in creating the user", err);
        return res.status(500).send("Internal Server Error"); // Handle the error appropriately
    }
};

// for the sign in 
module.exports.createSession = function (req, res) {

}