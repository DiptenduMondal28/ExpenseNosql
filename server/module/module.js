const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const expenceSchema= new Schema({
    name:{
        type:String,
        required:true
    },
    exp:{
        type:Number,
        require:true
    },
    item:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    userId:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:'User'
    }
})

module.exports = mongoose.model('expence',expenceSchema);


// const Sequalize=require('sequelize');

// const sequalize=require('../util/database');

// const Expence= sequalize.define('expence',{
//     id:{
//         type:Sequalize.INTEGER,
//         autoIncrement:true,
//         primaryKey:true
//     },
//     name:Sequalize.STRING,
//     exp:Sequalize.INTEGER,
//     item:Sequalize.STRING,
//     category:Sequalize.STRING
// });

// module.exports=Expence;