const mongoose = require('mongoose');
const schema=mongoose.Schema;

const accountSchema=new schema({
    username:String,
    password:String
});
module.exports=mongoose.model('Account',accountSchema);