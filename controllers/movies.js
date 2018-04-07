const express = require('express');
const router = express.Router();
const Movie = require('../models/movies.js');

router.get('/' , (req, res) => {
    Movies.find({}, (err, foundMovies) => {
        res.json(foundMovies);
    });
});


router.post('/' , (req, res) => {
    Movie.create(req.body, (err, createdMovie) => {
        res.json(createdMovie);
    });
});

router.delete('/:id' , (req, res) => {
    Movie.findByIdAndRemove(req.params.id, (err, deletedMovie) => {
        res.json(deletedMovie);
    });
});

router.put('/:id' , (req, res) => {
    Movie.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedMovie) => {
        res.json(updatedMovie);
    });
});

module.exports = router;
