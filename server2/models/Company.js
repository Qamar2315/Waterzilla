const mongoose = require('mongoose');
const schema = mongoose.Schema;

const companySchema = new schema({
    name: String,
    logo: String,
    bottles:
        [{
            type: schema.Types.ObjectId,
            ref: 'Bottle'
        }]

});
module.exports = mongoose.model('Company', companySchema);