const { where } = require('sequelize');
const User=require('../module/module');
const sequelize=require('../util/database')

const expenceCreate=async(req,name,exp,item,category)=>{
    return  req.user.createExpences({name,exp,item,category});
}

const getExpences=async(req,where)=>{
    return req.user.getExpences(where)
}

const getId=async(id)=>{
    return User.findByPk(id);
}

module.exports={
    expenceCreate,
    getExpences,
    getId
}