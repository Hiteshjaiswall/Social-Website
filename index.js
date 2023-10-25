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
// requiring mongo stroe t stroe the current session sos that out local user dont get logges out of my server
const MongoStore=require('connect-mongo');
// require sass
const sassMiddleware=require("node-sass-middleware");
//  requiring flash to show flash message
var flash = require('connect-flash');
// requiring our middleware that i made
const customMware=require('./config/middleware');
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
// mongo store is used to store ht session cookie in hte db 
// h0w to use this 
// Create a new MongoStore instance

// Use the 'mongoStore' instance in the session configuration
app.use(session({
    name: 'social',
    secret: 'something',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: 1000 * 60 * 100,
    },
    store: MongoStore.create({
        mongoUrl: 'mongodb://0.0.0.0/Social_app', // Assuming 'db' is your MongoDB connection
        autoRemove: 'disabled',
    }, function (err) {
        console.log(err || 'connect mongo db setup ok');
    }), // Use the 'mongoStore' instance here
}));

// next step to use session 
//  tell the app to use passport
app.use(sassMiddleware({
    /* Options */
    src: "./assets/scss",
    dest: './assets/css',
    debug: true,
    outputStyle: 'extended',
    // where do i look out for css file
    prefix:  '/css'  // Where prefix is at <link rel="stylesheets" href="prefix/style.css"/>
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticateUser);
app.use(flash());
//  usign custom mware
app.use(customMware.setFlash);
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