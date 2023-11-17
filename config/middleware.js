module.exports.setFlash=function(req, res, next){
    // store the flash in the locals in res'
    
    res.locals.flash={
        'success':req.flash('success'),
        'error':req.flash('error')
    }
    next();
}