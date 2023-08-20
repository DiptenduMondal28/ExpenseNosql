const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const forgotPassword = new Schema({
    UUID:{
        type: Schema.Types.UUID,
        required:true
    },
    active:{
        type:Boolean,
        required:true
    },
    userId:{
        type:Schema.Types.ObjectId
    }
})

module.exports = mongoose.model('Forgotpassword',forgotPassword);

// const Sequelize=require('sequelize');

// const sequalize=require('../util/database');

// const forgotPassword = sequalize.define('forgotPasswordRequest',{
//     id:{
//         type:Sequelize.UUID,
//         unique: true,
//         primaryKey: true
//     },
//     active: Sequelize.BOOLEAN,
//     expiresby: Sequelize.DATE
// });

// module.exports=forgotPassword;