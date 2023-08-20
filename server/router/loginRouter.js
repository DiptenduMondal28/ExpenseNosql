const express = require('express');
const router = express.Router();

const controller=require('../controller/loginController')
const authentication=require('../middleware/auth');

//login post request
router.post('/login',controller.login);

router.get('/ispremium',authentication.authenticate,controller.ispremium)

module.exports=router;