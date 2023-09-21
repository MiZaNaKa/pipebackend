
class pipe{
    constructor(
        chartID='',
        date=new Date(),
        pipeValue=[],
        chartValue=[]
    ){
        this.chartID=chartID,
        this.date=date,
        this.pipeValue=pipeValue,
        this.chartValue=chartValue
    }
}
module.exports=pipe