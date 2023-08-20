const Sequelize=require('sequelize');

const sequalize=require('../util/database');

const downloadAllFile = sequalize.define('fileurl',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    url:{
        type:Sequelize.STRING(500),
        allowNull: false,
        unique: true,
        validate: {
            isUrl: true,
        }
    }
});

module.exports=downloadAllFile;