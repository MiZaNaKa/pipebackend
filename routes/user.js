var express = require('express');
var router = express.Router();
// var mongoDbService = require("../service/mongodb")
var UserService = require("../modules/user/userService")
var Response = require("../responseData/responseData")
var withAuth = require("../util/headerAuth")
const nodemailer = require("nodemailer");
const smtpTransport = require("nodemailer-smtp-transport");
const otpHeloper = require('../util/token')
const jwtHelper = require('../util/jwtHelper')
var Bcrypt = require('bcryptjs');
// import HTML_TEMPLATE from "../otpTemplate/mail-template";

var transporter = nodemailer.createTransport(
  smtpTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: 'khinlay.merryshall@gmail.com',
      pass: 'jaygfokzqayevakg'
    },
    tls : { rejectUnauthorized: false }
  })
);

// let transporter = nodemailer.createTransport({
//   service: 'Gmail',
//   host: 'smtp.gmail.com',
//   port: 465,
//   auth: {
//     user: 'khinlay.merryshall@gmail.com',
//     pass: 'Uzwdktakkt295810#'
//   },
//   tls : { rejectUnauthorized: false }
// });

router.get('/helloTestingWithAuth',withAuth,async function (req, res, next) {
  console.log(req.params)
  console.log("hello kitty")
  console.log("hello kitty")
});

router.get('/helloTesting',async function (req, res, next) {
  console.log(req.params)
  console.log("hello kitty")
  console.log("hello kitty")
});

router.post('/', (req, res) => {
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'khinlay.merryshall@gmail.com',
      pass: 'jaygfokzqayevakg'
    },
    tls : { rejectUnauthorized: false }
  });
  
  var mailOptions = {
    from: 'khinlay.merryshall@gmail.com',
    to: 'khinkhinthant.sead@gmail.com',
    subject: 'Chart',
    text: 'That was easy!'
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
      console.log('Email sent: ' + info.response);
    }
  });
});

router.get('/getEmailOTP/:email',async function (req, res, next) {
  var ResponseData=new Response()
  try{
    let transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: "plats.service@gmail.com", // generated ethereal user
        pass: 'plats.service.password123', // generated ethereal password
      },
    });
  
    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"plats.service@gmail.com', // sender address
      to: "khinlay.merryshall@gmail.com", // list of receivers
      subject: "Hello ✔", // Subject line
      text: "Hello world?", // plain text body
      html: "<b>Hello world?</b>", // html body
    });
    console.log(info);
    console.log(info);
    console.log("Message sent: %s", info.messageId);


    var id = req.params.id;
    var result = await UserService.getMyPipe(id)
    res.json(result);
  }
  catch(e){
    console.log(e)
    console.log(e)
    ResponseData.getFailResponseData(e)
  }
  
});


router.get('/getDetailPipe/:id',async function (req, res, next) {
    var ResponseData=new Response()
    try{
      var id = req.params.id;
      var result = await UserService.getDetailPipe(id)
      res.json(result);
    }
    catch(e){
      ResponseData.getFailResponseData(e)
    }
    
});


router.get('/getOTP/:email',async function (req, res, next) {
  var ResponseData=new Response()
  try{
    var result = await UserService.checkEamil(req.params.email)
    var returnResult={
      status:0,
      data:[],
      message:''
    }
    if(result.success.data.success.data.length===0){
      var rec={
        email:req.params.email
      }
      var token = await otpHeloper.generateOTP(rec)

      var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'khinlay.merryshall@gmail.com',
          pass: 'jaygfokzqayevakg'
        },
        tls : { rejectUnauthorized: false }
      });
      
      var mailOptions = {
        from: 'khinlay.merryshall@gmail.com',
        to: req.params.email,
        subject: 'Chart',
        text: 'This is your opt.'+token.token
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
          console.log(error);
          res.json(error);
        } else {
          console.log('Email sent: ' + info.response);
          console.log('Email sent: ' + info.response);
          var emailOTPObject={
            otp:token,
            email:req.params.email
          }
          var insertedORUpdateEmailOTP =  UserService.insertORUpdateEmailOTP(emailOTPObject)
          console.log(insertedORUpdateEmailOTP);
          console.log(insertedORUpdateEmailOTP);
          returnResult.status=1
          res.json(returnResult);
        }
      });
     
      
    }
    else{
      returnResult.message="email is exist"
      res.json(returnResult);
    }
    
  }
  catch(e){
    ResponseData.getFailResponseData(e)
    res.json(ResponseData);
  }
});

router.post('/verifyOTP',async function (req, res, next) {
  var ResponseData=new Response()
  try{
    var request=req.body
    var findEmailOTP = await UserService.getEmailOTP(request.email)
    var returnResult={
      status:0,
      data:[],
      message:''
    }
    console.log(findEmailOTP)
    console.log(findEmailOTP)
    
    if(findEmailOTP.success.data.success.data.length>0){
      var secret=findEmailOTP.success.data.success.data[0].otp.secret
      var verifyResult = await otpHeloper.verifyOTP(request.otp,secret)
      console.log(verifyResult)
      console.log(verifyResult)
      if(verifyResult){
        var created = await UserService.createAccount(request)
        console.log(created.success.data)
        console.log(created.success.data)
        if(created.success.data.status===1){
          var jwt=await jwtHelper.generateJWT(created.success.data.success.data)
          returnResult.status=1
          var request={
            jwt:jwt,
            userInfo:created.success.data.success.data
          }
          returnResult.data=request
          res.json(returnResult);
        }
        else{
          returnResult.message="Email is exist"
          res.json(returnResult);
        }
      }
      else{
        returnResult.message="OTP is not correct"
        res.json(returnResult);
      }
    }
    else{
      var returnObj={
        status:0,
        message:'server error'
      }
      res.json(returnObj);
    }
    
  }
  catch(e){
    console.log(e.message)
    console.log(e)
    console.log(e)
    ResponseData.getFailResponseData(e)
  }
});



router.post('/create',async function (req, res, next) {
  var ResponseData=new Response()
  try{
    var request=req.body
    var result = await UserService.createPipe(request)
    res.json(result);
  }
  catch(e){
    ResponseData.getFailResponseData(e)
  }
});


router.post('/insert',async function (req, res, next) {
  var ResponseData=new Response()
  try{
    var request=req.body
    var result = await UserService.insertPipe(request)
    res.json(result);
  }
  catch(e){
    ResponseData.getFailResponseData(e)
  }
});

router.post('/login',async function (req, res, next) {
  var request=req.body
  var checkedEmail = await UserService.checkEamil(request.email)
  
  var returnResult = {
    ok:false,
    status:0,
    message:"",
    loginUser:"",
    loginJwt:""
  };
  if(checkedEmail.success.data.success.data.length>0){
    var checkPassword = Bcrypt.compareSync(request.password, checkedEmail.success.data.success.data[0].password)
    if(checkPassword){
      delete checkedEmail.success.data.success.data[0].password
      var jwt  = await jwtHelper.generateJWT(checkedEmail.success.data.success.data[0]);
      returnResult.loginUser=checkedEmail.success.data.success.data[0]
      returnResult.loginJwt=jwt
      returnResult.status=1
    }
    else{
      returnResult.message="Password is not correct"
    }
  }
  else{
    returnResult.message="email is not exist"
  }
  res.json(returnResult);
  
});




router.post('/filterDate',async function (req, res, next) {
  var ResponseData=new Response()
  try{
    
    var request=req.body
    var result = await UserService.filterDate(request)
    res.json(result);
  }
  catch(e){
    ResponseData.getFailResponseData(e)
  }
});





module.exports = router;
