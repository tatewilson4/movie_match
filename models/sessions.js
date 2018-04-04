const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sessionSchema = Schema({
    name: String,
    passwords: String
});

const Session = mongoose.model('Session' , sessionSchema);

module.exports = Session;
