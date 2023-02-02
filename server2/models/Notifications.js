const mongoose = require('mongoose');
const schema = mongoose.Schema;

const notificationsSchema = new schema({
    notification: String
});
module.exports = mongoose.model('Notifications', notificationsSchema);