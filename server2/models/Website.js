const mongoose = require('mongoose');
const schema=mongoose.Schema;

const websiteSchema=new schema({
    aboutUS:String,
    image:String
});
module.exports=mongoose.model('Website',websiteSchema);