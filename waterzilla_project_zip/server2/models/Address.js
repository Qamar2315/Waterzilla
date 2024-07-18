const mongoose = require('mongoose');
const schema=mongoose.Schema;

const addressSchema=new schema({
    houseNo:Number,
    streetNo:Number,
    city:String,
    zipCode:Number
});
module.exports=mongoose.model('Address',addressSchema);