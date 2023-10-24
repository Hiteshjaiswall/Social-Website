

//  lets display the posts on the screen for that i need to get all the posts
//  require post

const Post=require('../models/post');

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

    Post.find({}).populate('user')
    .then(posts=>{
        return res.render('home.ejs', {
            title:"social",
            posts:posts
        });
    })
    .catch(err=>{
        console.log("error in rendering the post", err);
    })
    
}