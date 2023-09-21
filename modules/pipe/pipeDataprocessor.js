const Response = require('../../responseData/responseData')
var mongoDbService= require('../../service/mongodb')
class pipeDataprocessor{
    async createPipe(request){
        var responseData = new Response()
        try{
            var result=await mongoDbService.db.collection('pipe').insertOne(request)
            responseData.getSuccessResponseData(result)
        }
        catch(e){
            responseData.getServerErrorResponseData(e)
        }
        return responseData
    }

    async createChart(value){
        var responseData = new Response()
        try{
            var result=await mongoDbService.db.collection('chart').insertOne(value)
            responseData.getSuccessResponseData(result)
        }
        catch(e){
            responseData.getServerErrorResponseData(e)
        }
        return responseData
    }


    async getMyPipe(id){
        var responseData = new Response()
        try{
            var result=await mongoDbService.db.collection('chart').find({"userID":id}).toArray()
           
            responseData.getSuccessResponseData(result)
        }
        catch(e){
            responseData.getServerErrorResponseData(e)
        }
        return responseData
    }

    async getDetailPipe(id){
        var responseData = new Response()
        try{
            var result=await mongoDbService.db.collection("pipe").find({"chartID":id}).sort({"date":-1}).toArray()
            
            
            responseData.getSuccessResponseData([result[0]])
        }
        catch(e){
            responseData.getServerErrorResponseData(e)
        }
        return responseData
    }

    
    async filterDate(request){
        var responseData = new Response()
        try{
            var result=await mongoDbService.db.collection("pipe").find({
                "chartID":request.id,
                date: {
                $gte:new Date(request.startDate),
                $lt:new Date(request.endDate)
            }}).toArray()
            
            
            

            if(result.length>0){
                var tempoOBj=[]
                var temrequest=result[0].pipeValue
                for(var l=0;l<temrequest.length;l++){
                    var request={
                        label:temrequest[l].label,
                        value:0
                    }
                    tempoOBj.push(request)
                } 

                
                
                

            

                if(result.length>1){
                    var returnObj={
                        "chartID" : result[0].chartID,
                        "date" : request.startDate+"__"+request.endDate,
                        "pipeValue" : tempoOBj,
                        "chartValue" : [
                            
                        ]
                    }
                    var allTotal=0
                    for(var z=0;z<result.length;z++){
                        var loop=result[z]
                        
                        
                        const total = loop.pipeValue.reduce((accumulator, object) => {
                            var number=parseInt(object.value)
                            return accumulator + number;
                        }, 0);
                        
                        allTotal+=total
                        
                        
                        
                        for(var i=0;i<loop.pipeValue.length;i++){
                            var label=loop.pipeValue[i].label
                            
                            
                            var obj=tempoOBj.filter(x=>x.label===label)
                            
                            
                            if(obj.length>0){
                                obj[0].value+=parseInt(loop.pipeValue[i].value)
                            }
                            
                        } 
                    } 

                    
                    
                    

                    var percentageTotal=0

                    var testCalculate1Total=0
                
                    for(var i=0;i<tempoOBj.length;i++){
                        const calcualtion = (tempoOBj[i].value/allTotal) * 100

                        var testCalculate1=(100 * tempoOBj[i].value) / allTotal
                        
                        
                        testCalculate1Total+=testCalculate1

                       
                    
                        var randomColor = Math.floor(Math.random()*16777215).toString(16)
                        var object={
                            percentage: calcualtion,
                            color: '#'+randomColor,
                        }
                        percentageTotal+=calcualtion
                        returnObj.chartValue.push(object)
                    } 
                    
                    
                    
                    responseData.getSuccessResponseData([returnObj])
                }
                else{
                    
                    responseData.getSuccessResponseData(result)
                }


            }
            else{
                
                responseData.getSuccessResponseData(result)
            }
            

            
            
        }
        catch(e){
            responseData.getServerErrorResponseData(e)
        }
        return responseData
    }


    


    
}

module.exports=new pipeDataprocessor()