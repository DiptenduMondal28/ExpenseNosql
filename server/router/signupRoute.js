const express = require('express');
const router = express.Router();

const controller=require('../controller/signUpcontroller')


//sign up post request
router.post('/signup',controller.signup);





module.exports=router;