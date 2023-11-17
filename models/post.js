// to create post post must have user in it 
//  an the relationship in them is one to many 
//  how to estabilishe relationship 

//  requiring mongoose 
const mongoose = require("mongoose");



//  making a new post schema 

const postSchema = new mongoose.Schema({
    //  fields 
    content:{
        type:String,
        required:true
    },
    user :{
        //  this is a refrence this is our first step
        type : mongoose.Schema.Types.ObjectId,
        //  this is a refence where to refer 
        ref:'User'
    },
    //  to fetch comment fast include the array of all the comments id for ref

    comments:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Comment'
        }
    ]
}
,{
    timestamps:true
})

const Post = mongoose.model('Post', postSchema);

module.exports=Post;