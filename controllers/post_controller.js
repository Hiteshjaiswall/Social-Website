//  making a post controller to strore and show post on the screen 
//  now first we need to require post schema 

//  requiring post schema 
const Post = require("../models/post");
//  requiring comments
const Comment=require('../models/comment');
//  now creating a controller to make a post 
// module.exports.create=function(req, res){
//     //  to create a post
    
//     Post.create({
//     content:req.body.content,
//     //  to save user 
//     user:req.user._id
//     })
//     .then((post)=>{
//         // check if the req is xml 
//         if(req.xhr){
            
//             return res.status(200).json({
//                 data: {
//                     post:post,
//                 },
//                 message:"post created !"
//             })
//         }
//         return res.redirect('back');
//     })
//     .catch(err=>{
//         return ;
//     })
// }
module.exports.create = async function (req, res) {
    try {
        // Create a post
        const post = await Post.create({
            content: req.body.content,
            user: req.user._id, // You should already have user information available in req.user
        });

        // Populate the 'user' field to get the user's details, excluding the password
        const populatedPost = await Post.populate(post, { path: 'user', select: '-password' });

        if (req.xhr) {
            return res.status(200).json({
                data: {
                    post: post,
                },
                message: 'Post created!'
            });
        }
        return res.redirect('back');
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            error: 'An error occurred while creating the post.'
        });
    }
};


module.exports.destroy=function(req, res){
    Post.findById(req.params.id)
    
    .then(post=>{
        console.log(post);
        //  check weathe the user who deleting the post is the one made the post
        //  so if im comparing two string i should convert bu tmongoose do it for me by using .id
        //  this is to find the user so in this module i didnt populate the post so user in post is id
        if(post.user == req.user.id){
            post.deleteOne();
            Comment.deleteMany({post:req.params.id})
            
            
            .then(()=>{
                if(req.xhr){
                    return res.status(200).json({
                        data:{
                            post_id:req.params.id
                        },
                        message:"post delete successfully"
                    })
                }
                return res.redirect('back');
            })
        }
        else{
            return res.redirect('back');
        }
    })
    .catch(err=>{
    console.log("error in deleteing post", err);
    })
}