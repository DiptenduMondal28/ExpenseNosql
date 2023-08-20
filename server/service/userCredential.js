const Credential=require('../module/signupModule');

const findCredential=async(req,email)=>{
    return Credential.findAll({where:{email:email}});
}

const ispremium=async(req)=>{
    return User.findOne({email:email});
}

module.exports={
    findCredential,
    ispremium
};