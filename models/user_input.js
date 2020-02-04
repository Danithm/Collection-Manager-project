var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var user_input_Schema = new Schema({
    title: String,
    author: String,
    type: String,
    user: String,
    description: String
});

module.exports = mongoose.model('user_input', user_input_Schema);