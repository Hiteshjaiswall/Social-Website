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



<!-- how did passport authentication workded -->

first we installed the local stratergy passport 
we used new stratergy passport.use( new localstratergy{
    we set user field email 
    and found the user by email if we found the user then okay if the user password didnt match we redirected
})

serialise user 
it piks out the info and set into the session cookie 


desearize convert ht id to user 



then we make check authentication 

and also set authentication to set locals user to user 

