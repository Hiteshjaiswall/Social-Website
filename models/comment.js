const mongoose = require("mongoose");


const commentSchema= new mongoose.Schema({
    content:{
        type:String,
        required:true
    },

    //  comment belongs to the user so ref needs to be put 
user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User'
},
//  adding the refrence for post
post:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Post'
}
},
{
    timestamps:true
});

const Comment = mongoose.model('Comment', commentSchema);
module.exports=Comment;