//import core module
const express=require('express');
const bodyParser=require('body-parser');
const cors=require('cors');
const path=require('path');
const fs=require('fs')
const dotenv=require('dotenv');
dotenv.config();
const helmet=require('helmet');
const compression=require('compression');
const morgan=require('morgan');
const mongoose = require('mongoose');

//routers import
const route=require('./router/router');
const signupRouter=require('./router/signupRoute')
const loginRouter=require('./router/loginRouter');
const purchase=require('./router/purchase');
const premiumUser=require('./router/premiumuserrouter')
const forgotPassword=require('./router/forgotPasswordRouter')

//file import 
const User = require('./module/signupModule');
const Expence = require('./module/module');
const Order=require('./module/puchase');
const ForgotPassword=require('./module/forgotPasswordRequestModule')
const UrlModule=require('./module/urlDownloadData')


//file system store for matgan
const accessLogStream=fs.createWriteStream(path.join(__dirname,'access.log'),{flags:'a'});


//use of express module
const app=express();
app.use(helmet());
app.use(compression());
app.use(morgan('combined',{stream:accessLogStream}));
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

app.use(signupRouter) //sign up page router
app.use('/password',forgotPassword);//forgot password router
app.use(loginRouter)//logn router
app.use(route);//webpage router
app.use('/purchase',purchase);//purchase on rozer pay or not
app.use('/premium',premiumUser)//premium user or not

// use of bad router address
app.use((req,res,next)=>{
    res.status(404).send('<h1>404 Error!</h1><br><h4>no page exixt like that URL!</h4>')
})



const username = process.env.USERNAME_MONGO;
const password = process.env.DATABSE_PASSWORD;
mongoose.connect(`mongodb+srv://${username}:${password}@cluster0.vuytclo.mongodb.net/expense?retryWrites=true&w=majority`).then(result=>{
    console.log('connected!')
    app.listen(process.env.PORT);
})
