const nodemailer = require("nodemailer");
const ejs =require('ejs');
const path =require('path');
//  it defines how will u send up the mail 
//  it has servise providers and host etc
const transporter = nodemailer.createTransport({
    //  the servise that we are taking
    service:'gmail',
    //  host 
    //  gmail mailing server this is a domain to interact with 
    //  we need to create mailer file
    host: "smtp.gmail.com",
    //  it is the most secure service
    port: 587,
    secure: false,
    //  authentication of the email sender
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
    user: "hiteshjaiswal@gmail.com",
    pass: "hitesh@80582",
    },
    });
//  to render the temlate in email to make it look beautiful 
    let renderTemplate = (data, relativepath)=>{
    let mailHTML;
    ejs.renderFile(
    path.join(__dirname, '../views/mailers', relativepath ),
    data,
    function(err, template){
        if(err){
            console.log("Error in renering template", err);
        }
        mailHTML=template;
    }
    )
    return mailHTML;
    }
    module.exports={
        transporter:transporter,
        renderTemplate:renderTemplate,
    }