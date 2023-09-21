const Response = require('../../responseData/responseData')
var mongoDbService= require('../../service/mongodb')
var ObjectID = require('mongodb').ObjectID;
class userDataprocessor{
    

    async checkEamil(email){
        var responseData = new Response()
        try{
            var result=await mongoDbService.db.collection("users").find({"email":email}).toArray()
            responseData.getSuccessResponseData(result)
        }
        catch(e){
            responseData.getServerErrorResponseData(e)
        }
        return responseData
    }

    async insertORUpdateEmailOTP(request){
        var responseData = new Response()
        try{
            var findEmail=await mongoDbService.db.collection("usersEmailOTP").find({"email":request.email}).toArray()
           
            if(findEmail.length===0){
                var result=await mongoDbService.db.collection("usersEmailOTP").insertOne(request)
            }
            else{
                var result=await mongoDbService.db.collection("usersEmailOTP").updateOne({
                    "email":request.email
                },{
                    $set:{
                        "otp": request.otp
                    }
                })
            }
            responseData.getSuccessResponseData(result)
        }
        catch(e){
            responseData.getServerErrorResponseData(e)
        }
        return responseData
    }

    async getEmailOTP(email){
        var responseData = new Response()
        try{
            var result=await mongoDbService.db.collection("usersEmailOTP").find({"email":email}).toArray()
            responseData.getSuccessResponseData(result)
        }
        catch(e){
            responseData.getServerErrorResponseData(e)
        }
        return responseData
    }

    async createAccount(request){
        var responseData = new Response()
        try{
            var findEmail=await mongoDbService.db.collection("users").findOne({"email":request.email})
            console.log(findEmail)
            console.log(findEmail)
            if(findEmail){
                var responseData={
                    status:0,
                    message:"email is exist"
                }
                
            }
            else{
                var result=await mongoDbService.db.collection("users").insertOne(request)
                var id =result.insertedId.toString()
               
                var findUserInfo=await mongoDbService.db.collection("users").findOne({"_id":ObjectID(id)})
                delete findUserInfo.password
                responseData.getSuccessResponseData(findUserInfo)
            }
        }
        catch(e){
            responseData.getServerErrorResponseData(e)
        }
        return responseData
    }

    

    
}

module.exports=new userDataprocessor()