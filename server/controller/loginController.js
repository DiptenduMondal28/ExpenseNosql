const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken');
const findCredential=require('../service/userCredential');
const User = require('../module/signupModule');

function generateAccessToken(id,name){
    return jwt.sign({userId:id,name:name},process.env.token)
}

module.exports.login=async(req,res,next)=>{
        const email=req.body.email;
        const password=req.body.password;

        console.log(email,password)
        // const credentialCheck=await findCredential.findCredential(req,email).then(user =>{
        //     console.log(user)
        //     if(user.length>0){
        //         bcrypt.compare(password,user[0].password,(err,result)=>{
        //             if(result){
        //                 res.status(200).json({success:true,message:'user logged in succesfully',user:user,token:generateAccessToken(user[0].id,user[0].name)})
        //             }else{
        //                 return res.status(400).json({success:false,message:'check password'})
        //             }

        //             if(err){
        //                 res.status(500).json({success:false,message:`something error:${err}`})
        //             }
        //         })
        //     }else{
        //         res.status(404).json({success:false,message:"user not signup"})
        //     }
        // }).catch(err=>{
        //     res.status(500).json({success:false,message:`something error:${err}`})
        // })

        const credentialCheck= await User.findOne({email:email}).then(user =>{
            console.log(user.name,user.password,user.email)
            if(user){
                        bcrypt.compare(password,user.password,(err,result)=>{
                            if(result){
                                res.status(200).json({success:true,message:'user logged in succesfully',user:user,token:generateAccessToken(user._id,user.name)})
                            }else{
                                return res.status(400).json({success:false,message:'check password'})
                            }
        
                            if(err){
                                res.status(500).json({success:false,message:`something error:${err}`})
                            }
                        })
                    }else{
                        res.status(404).json({success:false,message:"user not signup"})
                    }
        }).catch(err=>{
            console.log(err)
        })

        console.log(credentialCheck)
        
}


module.exports.ispremium=async (req,res,next)=>{
    // console.log('ispremium:',req.user)
    // const detail=await findCredential.ispremium(req);
    // console.log(detail)
    // res.send(detail);
    const detail = await User.findById(req.user._id)
    console.log('detail',detail)
    res.send(detail)
}