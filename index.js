//requiring express
const express = require('express');
//usign express 
const app = express();
// setting up the port by default port is 80 
const port =5000;
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