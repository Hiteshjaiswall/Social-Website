//requiring express
const express = require('express');
//usign express 
const app = express();
// requiring cookie parser to maintai a cookie to be stored
const cookieParser=require("cookie-parser");
// setting up the port by default port is 80 
const port =5000;
// using database
const db = require('./config/mongoose');
// setiing up the session to use passport 
const session =require("express-session");
// require passport
const passport=require("passport");
// require passport local
const passportlocal=require("./config/passport-local-stratergy");
// reading the post request
app.use(express.urlencoded());
// using the cookie parser
app.use(cookieParser());
// now we are going to set us our stativ file now e have to define the folde in which there are our static files
app.use(express.static('./assets'));
// to use the laouts we downloaded the lib called as express ejs payouts
const expressLayouts = require('express-ejs-layouts');
// to use the layouts we need to make it before the routed so the website knows we are using the layouts 
app.use(expressLayouts);
// use ejs as template engine 
app.set('view engine', 'ejs');
// now to set up the ejs 
app.set('views', './views');
// setting up the session cookie 
app.use(session( {
    name:'social',
    // this ia a secret key for encription and all 
    secret:'something',
    // 
    saveUnintilised:false,
    // 
    resave:false,
    // need to give a age to the cookie before it expired 
    cookie :{
        maxAge : (1000 * 60 * 100)
    }
}));

// next step to use session 
//  tell the app to use passport

app.use(passport.initialize());
app.use(passport.session());

// use express router 
app.use('/', require('./routes/index'));
//making the aapp listen 
app.listen(port, (err)=>{
    if(err){
        console.log(`Error in running the server on port: ${port}` );
    }
    // using backtics to print is called as intepollation
    console.log(`server is running on the port : ${port}`);
})