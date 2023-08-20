const User=require('../module/signupModule');
const fileUrlStore=require('../module/urlDownloadData')

const leaderBoard=async()=>{
    return  User.findAll({
        order:[['totalexpence','DESC']]
    });
}

const download=async(req)=>{
    return req.user.getExpences({where:{userID:req.user.id}});
}

const urlAddOnDataBase=async(userID,fileUrl)=>{

    const user=await User.findByPk(userID);
    if(!user){
        console.log("user not found for add url on database")
        return;
    }
    const urlCreated=await fileUrlStore.create({
        url:fileUrl,
        userId:userID
    });
    console.log('url created',urlCreated);
}

module.exports={
    leaderBoard,
    download,
    urlAddOnDataBase
};