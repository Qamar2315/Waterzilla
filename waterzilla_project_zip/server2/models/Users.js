const mongoose = require('mongoose');
const schema = mongoose.Schema;

const userSchema = new schema({
    name: String,
    age: Number,
    gender: String,
    cnic: Number,
    phone: Number,
    email: String,
    reviews:
        [
            {
                type: schema.Types.ObjectId,
                ref: 'Reviews'
            }
        ],
    account: {
        type: schema.Types.ObjectId,
        ref: 'Account'
    },
    address: {
        type: schema.Types.ObjectId,
        ref: 'Address'
    }
});

module.exports = mongoose.model('Users', userSchema);