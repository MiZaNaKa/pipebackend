var mongo = require('mongodb');
var mongoClient = mongo.MongoClient;

class MongoDBService {

    constructor() {
        // this.dbUrl = 'mongodb://localhost:27017';
        // mongodb://pipe:gorqNLsayFFaz2AuUgQsIjYDhT7HlXS4xNqVIAuRKqPazIJQ4Tmy7ErPtKM652w1Es3wOsfg6CaKACDbrU0LCA==@pipe.mongo.cosmos.azure.com:10255/?ssl=true&retrywrites=false&replicaSet=globaldb&maxIdleTimeMS=120000&appName=@pipe@
        // this.dbUrl = "mongodb+srv://KhinKhinThant:kktkkt295810@cluster0.ccbic.mongodb.net/";
        // this.dbUrl ='mongodb://pipe:gorqNLsayFFaz2AuUgQsIjYDhT7HlXS4xNqVIAuRKqPazIJQ4Tmy7ErPtKM652w1Es3wOsfg6CaKACDbrU0LCA==@pipe.mongo.cosmos.azure.com:10255/?ssl=true&retrywrites=false&replicaSet=globaldb&maxIdleTimeMS=120000&appName=@pipe@'
        this.dbUrl = 'mongodb+srv://platsadmin:66Gateway@cluster0.lj2q0mg.mongodb.net/Plats';
        this.db = null;
        this.gfs = null;
        this.uploadGridFS = null;
        this.collection=null;
    }

    async start() {
        try {
            await this.connect(this.dbUrl);
            // logger.info('connected to Mongodb.');  
            console.log('connected to Mongodb.');       
        }
        catch (err) {
            // errorlogger.error('Unable to connect to Mongodb. -' + err);
            console.log('Unable to connect to Mongodb. -' + err);
        }
    }

    async connect(url){
        var con = await mongoClient.connect(url, {useNewUrlParser: true, useUnifiedTopology: true });

        this.db = con.db('Plats');  
    }



    close(done) {
        var mongoDBService = this;
        if (mongoDBService.db) {
            mongoDBService.db.close(function (err, result) {
                mongoDBService.db = null;
            })
        }
    }
}

module.exports = new MongoDBService()