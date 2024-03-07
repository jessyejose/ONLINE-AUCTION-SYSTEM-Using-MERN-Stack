const Mongoclient=require('mongodb').MongoClient;
const client=new Mongoclient('mongodb://0.0.0.0:27017/')

function connection(){
	return client.connect().then((db)=>{
		let data=db.db('Auction');
		return data;
	})

}
module.exports =connection()

