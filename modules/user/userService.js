var userDataprocessor = require("./userDataprocessor")
var User = require("../../models/user")
var ResponseData=require("../../responseData/responseData")
var Bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid')


class userService{
    

    async checkEamil(value){
        var responseData=new ResponseData()
        try{
            var result=await userDataprocessor.checkEamil(value)
            responseData.getSuccessResponseData(result)
        }
        catch(e){
            responseData.getServerErrorResponseData(e)
        }
        return responseData
    }

    
    async insertORUpdateEmailOTP(value){
        var responseData=new ResponseData()
        try{
            var result=await userDataprocessor.insertORUpdateEmailOTP(value)
            responseData.getSuccessResponseData(result)
        }
        catch(e){
            responseData.getServerErrorResponseData(e)
        }
        return responseData
    }


    async getEmailOTP(value){
        var responseData=new ResponseData()
        try{
            var result=await userDataprocessor.getEmailOTP(value)
            responseData.getSuccessResponseData(result)
        }
        catch(e){
            responseData.getServerErrorResponseData(e)
        }
        return responseData
    }

    
    async createAccount(value){
        var responseData=new ResponseData()
        try{
            var user = new User()
            user.name=value.name
            user.email=value.email
            user.password = Bcrypt.hashSync(value.password);
            var result=await userDataprocessor.createAccount(user)
            responseData.getSuccessResponseData(result)
        }
        catch(e){
            responseData.getServerErrorResponseData(e)
        }
        return responseData
    }
    

    

    
}
module.exports=new userService()

