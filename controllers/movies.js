const express = require('express');
const router = express.Router();
const Movies = require('../models/movies.js');

router.get('/' , (req, res) => {
    Movies.find({}, (err, foundMovies) => {
        res.json(foundMovies);
    });
});

router.post('/' , (req, res) => {
    Movies.create(req.body, (err, createdMovie) => {
        res.json(createdMovie);
    });
});

router.delete('/:id' , (req, res) => {
    Movies.findByIdAndRemove(req.params.id, (err, deletedMovie) => {
        res.json(deletedMovie);
    });
});

router.put('/:id' , (req, res) => {
    Movies.findByAndUpdate(req.params.id, {new:true}, (err, updatedMovie) => {
        res.json(updatedMovie);
    });
});

module.exports = router;
