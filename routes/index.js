const express = require('express');

// now to seprate routes and controller since the work togeathe we need to force it by using the router 

const router = express.Router();

// now to acess the home controle we module , exported it now to access it we need to requir ethe home controller

const homeController = require('../controllers/home_controller')

console.log('router loaded');

router.get('/', homeController.home );
// new router how to tell to use other routers
router.use('/users', require('./user'));
// now since we export this we need to tell the app to use it remember we used to say app.use
module.exports=router;