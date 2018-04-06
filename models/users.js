const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = Schema({
    user_list: Array,
    username: String,
    password: String
});

const User = mongoose.model('User' , userSchema);

module.exports = User;
