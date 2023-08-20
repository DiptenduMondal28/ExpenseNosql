const AWSS3service = require('../service/S3services')
const PremiumUser=require('../service/userPremium');
const AWS=require('aws-sdk');
require('dotenv').config();
const Expence =require('../module/module')


async function uploadToS3(data,filename){
    const BUCKET_NAME=process.env.AWS_BUCKET_NAME;
    const IAM_USER_KEY=process.env.AWS_ACCESS_KEY;
    const IAM_USER_SECRET=process.env.AWS_SECRET_KEY;

    let s3bucket=new AWS.S3({
        accessKeyId:IAM_USER_KEY,
        secretAccessKey:IAM_USER_SECRET,
        //Bucket:BUCKET_NAME
    })
    var params={
        Bucket:BUCKET_NAME,
        Key:filename,
        Body:data,
        ACL:'public-read'
    }

    return new Promise((resolve,reject)=>{
        s3bucket.upload(params,(err,response)=>{
            if(err){
                console.log("something wrong with upload data in s3 create bucket:",err)
                reject(err)
            }else{
                console.log("success:",response);
                resolve(response.Location);
            }
        })
    })
}

module.exports.userleaderboard=async(req,res,next)=>{
    try{
        const leaderboard=await Expence.aggregate([
            { $group : {
                _id:"$userId",
                total: {$sum:"$exp"}
            }},{
                $sort: {total: -1}
            },
            {
                $lookup: {
                  from: 'users', 
                  localField: '_id',
                  foreignField: '_id',
                  as: 'userDetails'
                }
              }
        ]).then(result=>{
            res.json(result)
        })
        //console.log(leaderboard)


    }catch(err){
        console.log(err)
        res.status(500).json(err)
    }
}

module.exports.download=async(req,res,next)=>{
    try{
        const expenses=await PremiumUser.download(req);
        console.log(("user expence download:"))
        console.log(expenses);
        const stringfiExpences=JSON.stringify(expenses);
        const userID=req.user.id;
        const filename=`Expense${userID}${new Date()}.txt`;
        const fileUrl = await uploadToS3(stringfiExpences,filename);
        const filecreated=PremiumUser.urlAddOnDataBase(userID,fileUrl);
        res.status(200).json({fileUrl,success:true})
    }catch(err){
        console.log(err)
        res.status(500).json({fileUrl:'',success:false,error:err})
    }
}