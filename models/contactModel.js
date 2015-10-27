var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var contactModel = new Schema({
    name: {type: String},
    email: {type: String},
    phone: {type: String},
    message: {type: String}
});

module.exports= mongoose.model('Contact', contactModel);