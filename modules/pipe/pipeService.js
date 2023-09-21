var pipeDataprocessor = require("./pipeDataprocessor")
var Pipe = require("../../models/pipe")
var ResponseData=require("../../responseData/responseData")

const { v4: uuidv4 } = require('uuid')


class pipeService{
    async createPipe(request){
        var responseData=new ResponseData()
        try{
            var obj={
                chartName: request.name,
                userID:request.userID,
                date:new Date()
            }
           
            var createChartResult=await this.createChart(obj)
            
            if(createChartResult.status==1){
                var chartID=createChartResult.success.data.success.data.insertedId.toLocaleString()
                var pipe=new Pipe()
                pipe.chartID=chartID
                pipe.date
                pipe.pipeValue=request.pipeValue
                pipe.chartValue=request.chartValue
                
                var data=request.pipeValue

                const total = data.reduce((accumulator, object) => {
                    var number=parseInt(object.value)
                    return accumulator + number;
                }, 0);
                  
               


               
                for(var i=0;i<request.pipeValue.length;i++){
                    const calcualtion = (request.pipeValue[i].value/total) * 100
                   
                    var randomColor = Math.floor(Math.random()*16777215).toString(16)
                    var object={
                        percentage: calcualtion,
                        color: '#'+randomColor,
                    }
                    pipe.chartValue.push(object)
                } 
                var result=await pipeDataprocessor.createPipe(pipe)
                responseData.getSuccessResponseData(result)
            }
            
        }
        catch(e){
            responseData.getServerErrorResponseData(e)
        }
        return responseData

    }

    async createChart(value){
        var responseData=new ResponseData()
        try{
            var result=await pipeDataprocessor.createChart(value)
            responseData.getSuccessResponseData(result)
        }
        catch(e){
            responseData.getServerErrorResponseData(e)
        }
        return responseData

    }

    
    async getMyPipe(id){
        var responseData=new ResponseData()
        try{
           
            var result=await pipeDataprocessor.getMyPipe(id)
            responseData.getSuccessResponseData(result)
        }
        catch(e){
            responseData.getServerErrorResponseData(e)
        }
        return responseData

    }


    
    async getDetailPipe(id){
        var responseData=new ResponseData()
        try{
           
            var result=await pipeDataprocessor.getDetailPipe(id)
            responseData.getSuccessResponseData(result)
        }
        catch(e){
            responseData.getServerErrorResponseData(e)
        }
        return responseData
    }

    async filterDate(request){
        var responseData=new ResponseData()
        try{
            var result=await pipeDataprocessor.filterDate(request)
            responseData.getSuccessResponseData(result)
        }
        catch(e){
            responseData.getServerErrorResponseData(e)
        }
        return responseData
    }


    
    async insertPipe(request){
        var responseData=new ResponseData()
        try{
            var pipe=new Pipe()
            pipe.chartID=request.chartID
            pipe.date
            pipe.pipeValue=request.pipeValue
            pipe.chartValue=[]
            
            var data=request.pipeValue

            const total = data.reduce((accumulator, object) => {
                var number=parseInt(object.value)
                return accumulator + number;
            }, 0);
                
            


            
            for(var i=0;i<request.pipeValue.length;i++){
                const calcualtion = (request.pipeValue[i].value/total) * 100
                
                var randomColor = Math.floor(Math.random()*16777215).toString(16)
                var object={
                    percentage: calcualtion,
                    color: '#'+randomColor,
                }
                pipe.chartValue.push(object)
            } 
            var result=await pipeDataprocessor.createPipe(pipe)
            responseData.getSuccessResponseData(result)
        }
        catch(e){
            responseData.getServerErrorResponseData(e)
        }
        return responseData

    }

    
}
module.exports=new pipeService()

