const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sessionSchema = Schema({
    username: String,
    password: String
});

const Session = mongoose.model('Session' , sessionSchema);

module.exports = Session;
