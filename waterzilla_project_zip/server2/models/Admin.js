const mongoose = require('mongoose');
const schema=mongoose.Schema;

const adminSchema=new schema({
    role:String,
    user: {
        type: schema.Types.ObjectId,
        ref: 'Users'
    },
    notifications:[{
        type:schema.Types.ObjectId,
        ref:'Notifications'
    }]
});
module.exports=mongoose.model('Admin',adminSchema);