const mongoose = require('mongoose');
const schema = mongoose.Schema;

const bottleSchema = new schema({
    name: String,
    quantity: Number,
    price: Number,
    size: String,
    image: String,
    company:{
        type: schema.Types.ObjectId,
        ref:'Company'
    },
    reviews: [
        {
            type: schema.Types.ObjectId,
            ref: 'Orders'
        }
    ]
});
module.exports = mongoose.model('Bottle', bottleSchema);