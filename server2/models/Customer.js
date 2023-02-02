const mongoose = require('mongoose');
const schema = mongoose.Schema;

const customerSchema = new schema({
    name: String,
    profilePic: String,
    orders:
        [{
            type: schema.Types.ObjectId,
            ref: 'Orders'
        }],
    user: {
        type: schema.Types.ObjectId,
        ref: 'Users'
    }
});
module.exports = mongoose.model('Customer', customerSchema);