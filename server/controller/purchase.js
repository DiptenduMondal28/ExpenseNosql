const Rozarpay=require('razorpay');

const Order=require('../module/puchase');
const User = require('../module/signupModule');

const env = require('dotenv').config();


module.exports.purchasepremium=async(req,res,next)=>{
    console.log(req.user._id)
    try{
        var rzp=new Rozarpay({
            key_id:process.env.razorPay_key_id,
            key_secret:process.env.razorPay_key_secret
        })
        //console.log(rzp)
        const amount=2500;

        rzp.orders.create({amount,currency:"INR"},(err,order)=>{
            if(err){
                throw new Error(JSON.stringify(err));
            }
            // req.user.createOrder({orderid:order.id,status:'PENDING'}).then(()=>{
            //     return res.status(201).json({order,key_id:rzp.key_id})
            // }).catch(err=>{
            //     throw new Error(err)
            // })
            const purchase = new Order({
                orderid:order.id,
                status:'PENDING',
                userId:req.user._id
            })

            purchase.save().then(()=>{
                return res.status(201).json({order,key_id:rzp.key_id})
            }).catch(err=>{
                throw new Error(err)
            })


        })


    }catch(err){
        console.log(err)
        res.status(403).json({message:"something wrong",error:err})
    }
}

module.exports.updatetransactionstatus=async(req,res,next)=>{
    console.log("update transaction:",req.body)
    console.log(req.user._id)
    try{
        const {payment_id,order_id}=req.body;
        console.log("on successfull state or not:",payment_id)
        console.log(payment_id,order_id)
        const order=await Order.findOne({orderid:order_id});
        console.log(order)
        if(!order){
            return res.status(404).json({ success: false, message: 'Order not found' });
        }
        if(payment_id===null || payment_id===undefined){
            console.log('failed order')
            const promise1=await Order.findOneAndUpdate(
                { orderid: order_id },
                {status: 'FAILED' }
              )
            const promise2 = await User.findByIdAndUpdate(req.user._id, {
                ispremium: false
            })
            Promise.all([promise1,promise2]).then(()=>{
            return res.status(202).json({success:true,message:'transaction successfull'});
        }).catch(err=>{
            console.log(err)
            return res.status(500).json({ success: false, message: 'Transaction update failed' });
        })
        }else{
            console.log('successfull order')
            console.log(order)
            const promise1=await Order.findOneAndUpdate(
                { orderid: order_id },
                { paymentid: payment_id, status: 'SUCCESSFUL' }
              )
            const promise2 = await  User.findByIdAndUpdate(req.user._id, {
                ispremium: true
            })
            Promise.all([promise1,promise2]).then(()=>{
            return res.status(202).json({success:true,message:'transaction successfull'});
        }).catch(err=>{
            console.log(err)
            return res.status(500).json({ success: false, message: 'Transaction update failed' });
        })
        }      
    }catch(err){
        console.log(err)
        throw new Error(err);
    }
}