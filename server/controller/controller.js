const userExpences=require('../module/module');
const Credential=require('../module/signupModule')
const sequelize=require('../util/database')
const Expence=require('../service/userExpences');
const { ConfigService } = require('aws-sdk');

module.exports.dataupload=async(req,res,next)=>{
    try{
        const name=req.body.name;
        const exp=req.body.exp;
        const item=req.body.item;
        const category=req.body.category;
        if(exp.length===0 || exp===undefined){
            return res.status(400).json({success:false,message:'expence parameter missing'})
        }
        console.log(name,exp,item,category);
        console.log(req.user)
        
        
        try{
            const expence = new userExpences({
                name:name,
                exp:exp,
                item:item,
                category:category,
                userId:req.user._id
            });
    
            await expence.save().then(result=>{
                console.log(result)
                res.status(200).json({expence:result})
            })

        }catch(err){
            return res.status(500).json({success:false,error:err})
        }
       
    }catch(err){
        console.log(err);
    }
}

//const ITEMS_PER_PAGE=4;
module.exports.getdata=async(req,res,next)=>{
    let ITEMS_PER_PAGE=req.query.ITEMS_PER_PAGE;
    console.log("items per page",ITEMS_PER_PAGE)
    console.log(req.user.id)
    let page=Number(req.query.page) || 1;
    console.log('page',page)
    let totalItems;
    // await User.count({where:{userId:req.user.id}}).then((total)=>{
    //     totalItems=total;
    //     return User.findAll({
    //         offset:(page-1)*4,
    //         limit:ITEMS_PER_PAGE,
    //         where:{userId:req.user.id}
    //     });
    // }).then((expence)=>{
    //     res.json({
    //         expence:expence,
    //         currentPage:page,
    //         hasNextPage:ITEMS_PER_PAGE*page<totalItems,
    //         nextPage:page+1,
    //         hasPreviousPage:page>1,
    //         previousPage:page-1,
    //         lastPage:Math.ceil(totalItems/ITEMS_PER_PAGE)
    //     })
    // }).catch(err=>console.log(err))
    console.log(req.query,req.params)
    await userExpences.countDocuments({userId:req.user._id}).then(total=>{
        console.log(total)
        totalItems=total;
        return userExpences.find({userId:req.user._id}).skip(parseInt((page-1)*ITEMS_PER_PAGE)).limit(parseInt(ITEMS_PER_PAGE));
    }).then(expence=>{
        console.log(expence)
        res.json({
                    expence:expence,
                    currentPage:page,
                    hasNextPage:ITEMS_PER_PAGE*page<totalItems,
                    nextPage:page+1,
                    hasPreviousPage:page>1,
                    previousPage:page-1,
                    lastPage:Math.ceil(totalItems/ITEMS_PER_PAGE)
                })
    })
    .catch(err=>{
        console.log(err)
    })
}


module.exports.deletedata=async(req,res,next)=>{
    const deleteId= req.params.id;
    console.log('delete req:',deleteId);
    try{
        await userExpences.findByIdAndRemove(deleteId).then(result=>{
            console.log(result);
            res.status(200).json({success:true,message:'Delete Successfully!'})
        }).catch(err=>{
            console.log(err);
            return res.status(404).json({ success: false, message: 'Data not found' });
        })
    }catch(err){
        console.log(err)
        return res.status(500).json({success:false,error:err})
    }
}

