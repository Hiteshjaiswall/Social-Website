const Comment=require('../models/comment');
const Post=require('../models/post');

module.exports.create=function(req, res){
    //  find the post with the post id 
    // and add the comment in the areay with the post id
Post.findById(req.body.post)
.then(post=>{
    Comment.create({
        content:req.body.content,
        post:req.body.post,
        user:req.user._id
    })
    .then(comment=>{
        post.comments.push(comment);
        // have to call save after updating
        post.save();
        res.redirect('/');
    })
if(req.xhr){
    return res.status(200).json({
        data:{
            comments:comments
        },
        message:"post created"
    })
}
})
.catch(err=>{
    console.log("error in creating comment", err);
})
}

//  making a controller to delete comment 
//  this a lil special lets see

module.exports.destroy=function(req, res){
    Comment.findById(req.params.id)
    .then(comment=>{
        if(comment.user == req.user.id){
            let postId = comment.post;
            comment.deleteOne();
            //  now pull out the comment from the post
            //  in built function
            Post.findByIdAndUpdate(postId, {$pull:{comments: req.params.id}})
            .then(post=>{
                return res.redirect('back');
            })
        }else{
            return res.redirect('back');
        }
    })
.catch(err=>{
    console.log("error in deleteing comments", err);
})
}