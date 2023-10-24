module.exports.home=function(req, res){

// this was to send the data now im rendering my page so i dont need it no more
    //return res.end("<h1>EXPRESS is up for social website</h1>")

    
    
    
     return res.render('home.ejs', {
        title:"social"
    });
}