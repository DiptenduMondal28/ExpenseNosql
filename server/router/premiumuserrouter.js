const express=require('express');
const router=express.Router();

const authentication=require('../middleware/auth');
const controller=require('../controller/premiumusercontroller');

//get leaderboard 
router.get('/leaderboard',authentication.authenticate,controller.userleaderboard);

// //get download file
// router.get('/download',authentication.authenticate,controller.download)


module.exports=router;