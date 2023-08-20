const express=require('express');
const router=express.Router();

const forgotPasswordController=require('../controller/forgotPasswordController');

router.use('/forgotpassword',forgotPasswordController.forgotPassword)

router.get('/resetpassword/:id',forgotPasswordController.resetpassword);

router.use('/updatepassword/:resetpasswordid',forgotPasswordController.updatepassword)

module.exports=router;