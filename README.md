# Social-Website

Steps how to create a social bacend website

Step 1) //requiring express to be use in the server
const express = require('express');
//usign express calling it as a function 
const app = express();
// setting up the port by default port is 80 
const port =5000;
//making the aapp listen 
app.listen(port, (err)=>{
    if(err){
        console.log(`Error in running the server on port: ${port}` );
    }
    // using backtics to print is called as intepollation
    console.log(`server is running on the port : ${port}`);
})

it will run the basic server


step2) set up   route ans display view



