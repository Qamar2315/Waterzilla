const mongoose = require('mongoose');
const schema = mongoose.Schema;

const ordersSchema = new schema({
    status: String,
    Address:
    {
        type: schema.Types.ObjectId,
        ref: 'Address'
    },
    Bottle:
    {
        type: schema.Types.ObjectId,
        ref: 'Bottle'
    },
    Customer:
    {
        type: schema.Types.ObjectId,
        ref: 'Customer'
    }

});
module.exports = mongoose.model('Orders', ordersSchema);