

//  lets display the posts on the screen for that i need to get all the posts
//  require post

const Post=require('../models/post');
const User=require('../models/user');

module.exports.home=function(req, res){

// this was to send the data now im rendering my page so i dont need it no more
    //return res.end("<h1>EXPRESS is up for social website</h1>")

    // Post.find({})
    // .then(posts=>{
    //     return res.render('home.ejs', {
    //         title:"social",
    //         posts:posts
    //     });
    // })
    // .catch(err=>{
    //     console.log("error in rendering the post", err);
    // })

    //  now we will populate the user 

    Post.find({}).sort('-createdAt')
    .populate('user')
    //  populate multiple models 
    .populate({
        path: 'comments',
        populate:{
            path:'user'
        }
    })
    .then(posts=>{
        User.find({})
        .then(user=>{
            return res.render('home.ejs', {
                title:"social",
                posts:posts,
                all_users:user
            });
        })
    })
    .catch(err=>{
        console.log("error in rendering the post", err);
    })
    
}