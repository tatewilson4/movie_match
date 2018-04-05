const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
   Title: String,
   Year: String,
   Poster: String,
   Actors: String,
   Genre: String,
   Metascore: String
});

const Movies =  mongoose.model('Movie', movieSchema);
module.exports = Movies;
