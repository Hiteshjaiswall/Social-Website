const express = require('express');
const passport=require("passport");
// now to seprate routes and controller since the work togeathe we need to force it by using the router 

const router = express.Router();
const userController=require('../controllers/user_controller');

router.get('/profile/:id', passport.checkAuthentication, userController.profile);
router.get('/sign-up', userController.signup);
router.get('/sign-in', userController.signin);
router.post('/create', userController.create);
router.post('/update/:id',  passport.checkAuthentication, userController.update);
//  usig passport as a middelware to authenticate 
//  done send fail
router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect:'/users/sign-in',}
) ,userController.createSession);

router.get('/auth/google', passport.authenticate('google', {scope:['profile', 'email']}));

router.get('/auth/google/callback', passport.authenticate('google', {failureRedirect:'/users/sign-in'}), userController.createSession);
router.get('/sign-out', userController.destroySession);
module.exports=router;
