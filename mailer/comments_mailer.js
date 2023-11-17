//  all tha mails has to go through my server so i can modify it acoording to my requirement 

//  now to crate it first i need to imoport node mailer 


const nodemailer=require("../config/nodemailer");
// also we can export the file like this 
// this is another way of exporting

exports.newComment=(comment)=>{
console.log("inside the new  mailer");
//  this is the exported transported it sends the emails for us 
// it takes arguments like given below
nodemailer.transporter.sendMail({
    //  the person sending the mail 
    from: "hiteshjaiswal",
    // the person we are sending the mail to 

    to:comment.users.email,

    subject:"New commment published",
    html: '<h1> YOUR COMMSENT IS NOW PUBLISHED</h1>'
},(err, info )=>{
    if(err){
        console.log("error in sending the mail ");
    return ;
    }
    console.log("message sent". info)
    return ;
})
}

//  now when ever the comment is made we need to vall thos mailer now to vall thos mailer 
// wher do we call it feom the comment controller