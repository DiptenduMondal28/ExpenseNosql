const express=require('express');
const router=express.Router();

const controller=require('../controller/controller');
const authentication=require('../middleware/auth')

// user data creation for the first time or expence add
router.post('/datapost',authentication.authenticate,controller.dataupload);

//user data fetching 
router.get('/getexpence',authentication.authenticate,controller.getdata);

//delete data from list
router.delete('/deletadata/:id',authentication.authenticate,controller.deletedata);



module.exports=router;