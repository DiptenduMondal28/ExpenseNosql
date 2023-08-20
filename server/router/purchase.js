const express=require('express');

const router= express.Router();

const purchasecontroller=require('../controller/purchase');

const authentication=require('../middleware/auth');

router.get('/premiummembership',authentication.authenticate,purchasecontroller.purchasepremium)

router.post('/updatetransactionstatus',authentication.authenticate,purchasecontroller.updatetransactionstatus)

module.exports=router;