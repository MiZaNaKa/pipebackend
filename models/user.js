
class user{
    constructor(
        name='',
        email="",
        password="",
        date=new Date()
    ){
        this.name=name,
        this.email=email,
        this.password=password,
        this.date=date
    }
}
module.exports=user