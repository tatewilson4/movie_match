const mongoose = require('mongoose');

const guestSchema = new mongoose.Schema({
    title: String,
    year: Number,
    poster: String,
    actors: String,
    genre: String,
    metascore: Number,
    comments: String
});

const Guests =  mongoose.model('Guest', guestSchema);
module.exports = Guests;
