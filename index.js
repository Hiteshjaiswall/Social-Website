//requiring express
const express = require('express');
//usign express 
const app = express();
// setting up the port by default port is 80 
const port =5000;
// to use the laouts we downloaded the lib called as express ejs payouts
// use ejs as template engine 
app.set('view engine', 'ejs');

// now to set up the ejs 
app.set('views', './views');

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