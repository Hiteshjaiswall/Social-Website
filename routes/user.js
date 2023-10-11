const express = require('express');

// now to seprate routes and controller since the work togeathe we need to force it by using the router 

const router = express.Router();
const userContoller=require('../controllers/user_controller');

router.get('/profile', userContoller.profile);


module.exports=router;