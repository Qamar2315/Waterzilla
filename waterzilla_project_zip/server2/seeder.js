const mongoose = require('mongoose');
const Admin = require('./models/Admin')

main().catch(err => console.log(err))
async function main() {
	await mongoose.connect('mongodb://127.0.0.1:27017/waterzilla');
	console.log("connected");
}

Admin.insertMany([
	{
		role:"admin",
		user:"63b26d975091f63df8b44c48",
		notifications:[
			"63b269efbd00e770d1b0db1a"
		]
	}
]).then((data) => {
	console.log("SUCCESSFULLY SAVED !!!")
	console.log(data)
})
	.catch((err) => {
		console.log(err)
	})