// requiring mongoose
const mongoose=require("mongoose");


//  importing  multer in user why because we are uploading specific to user
const multer=require('multer');

const path=require('path');

const AVATAR_PATH=path.join('/uploads/users/avatars');
// creating user schema 
const userSchema= new mongoose.Schema({
    // now we need to keep the email as unique
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        
    },
    name:{
        type:String,
        required:true,
    },
    bio:{
        type:String,
        require,
    },
    avatar:{
        type:String,
    }
    
}
,{
    timestamps:true
}
);


//  storing the multeer file 

let storage = multer.diskStorage({
    //  destination
    destination: function (req, file, cb) {
    cb(null, path.join(__dirname,'..' , AVATAR_PATH));
    },
    //  able to use this storage
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})

//  static funtions can be called on the whole class 

userSchema.statics.uploadedAvatar=multer({storage:storage}).single('avatar');
userSchema.statics.avatarPath=AVATAR_PATH;

const User=mongoose.model('User', userSchema);

module.exports=User;