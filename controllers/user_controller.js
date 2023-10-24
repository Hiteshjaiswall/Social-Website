//import model 
const User = require('../models/user');
module.exports.profile = async function (req, res) {
    // try{
    // return res.end("<h1>User Profile</h1>");
    return res.render('user_profile.ejs', {
        title: "soical website",
    })
    // to suthentiacte the profile page we need to use the cookies int heta order
//     if(req.cookies.user_id){
//     const user=await User.findById(req.cookies.user_id);
//     if(user){
//         return res.render('user_profile.ejs',{
//             title:"Social",
//             name:user.name
//         })
//     }
//     else{
//         console.log("inside");
//         return res.redirect('/users/sign-up');
//     }
//     }else{
//         console.log("inside sign in ");
//         return res.redirect('/users/sign-in');
//     }
// }
// catch(err){
//     console.log("erron in rendering profile page", err);
// }
}
// rendering the sign up page 
module.exports.signup = function (req, res) {
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render("user_signup", {
        title: "Social | Sign-up"
    })
}
// rendering the sign in page
module.exports.signin = function (req, res) {
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
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
module.exports.createSession = async function (req, res) {
    // find the user done

    //handel the user found done 

    // handel passrord that dont match 

    // handel session creation

    // handel user not found 

    // lets find the user 
// try{
//     const user =await User.findOne({email: req.body.email});
//     if(!user){
//         return res.redirct("back");
//     }
//     else{
//         // check for password 
//         if(user.password != req.body.password){
//         return res.status(401).send("Wrong username/password");
//         }else{
//             res.cookie('user_id', user.id);
//             return res.redirect("/users/profile");
//         }
//     }
// }
// catch(err){
// console.log("error in sigining in ", err);
// }
    // all the suthentication alreaady happened in the passport js 
    return res.redirect('/');
}


module.exports.destroySession = function(req, res){
//  now before redirecting we need ot log out of the current session so to do that
// passport will do it 
req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
}
