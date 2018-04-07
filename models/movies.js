const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    Title: String,
    Year: Number,
    Poster: String,
    Actors: String,
    Genre: String,
    Metascore: Number,
    Comments: String
});

const Movies =  mongoose.model('Movie', movieSchema);
module.exports = Movies;
