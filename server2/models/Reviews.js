const mongoose = require('mongoose');
const schema = mongoose.Schema;

const reviewShhema = new schema({
    description: String,
    user: {
        type: schema.Types.ObjectId,
        ref: 'Users'
    }
});
module.exports = mongoose.model('Reviews', reviewShhema);