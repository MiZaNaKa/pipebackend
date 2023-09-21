var express = require('express');
var router = express.Router();
// var mongoDbService = require("../service/mongodb")
var PipeService = require("../modules/pipe/pipeService")
var Response = require("../responseData/responseData")
var withAuth = require("../util/headerAuth")


router.get('/getMyPipe/:id',withAuth,async function (req, res, next) {
  var ResponseData=new Response()
  try{
    var id = req.params.id;
    var result = await PipeService.getMyPipe(id)
    res.json(result);
  }
  catch(e){
    ResponseData.getFailResponseData(e)
  }
  
});


router.get('/getDetailPipe/:id',withAuth,async function (req, res, next) {
    var ResponseData=new Response()
    try{
      var id = req.params.id;
      var result = await PipeService.getDetailPipe(id)
      res.json(result);
    }
    catch(e){
      ResponseData.getFailResponseData(e)
    }
    
});



router.post('/create',withAuth,async function (req, res, next) {
  var ResponseData=new Response()
  try{
    var request=req.body
    var result = await PipeService.createPipe(request)
    res.json(result);
  }
  catch(e){
    ResponseData.getFailResponseData(e)
  }
});


router.post('/insert',withAuth,async function (req, res, next) {
  var ResponseData=new Response()
  try{
    var request=req.body
    var result = await PipeService.insertPipe(request)
    res.json(result);
  }
  catch(e){
    ResponseData.getFailResponseData(e)
  }
});




router.post('/filterDate',withAuth,async function (req, res, next) {
  var ResponseData=new Response()
  try{
    
    var request=req.body
    var result = await PipeService.filterDate(request)
    res.json(result);
  }
  catch(e){
    ResponseData.getFailResponseData(e)
  }
});





module.exports = router;
