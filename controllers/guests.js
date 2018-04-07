const express = require('express');
const router = express.Router();
const Guests = require('../models/guests.js');

router.get('/' , (req, res) => {
    Guests.find({}, (err, foundGuests) => {
        res.json(foundGuests);
    });
});


router.post('/' , (req, res) => {
    Guests.create(req.body, (err, createdGuest) => {
        res.json(createdGuest);
    });
});

router.delete('/:id' , (req, res) => {
    Guests.findByIdAndRemove(req.params.id, (err, deletedGuest) => {
        res.json(deletedGuest);
    });
});

router.put('/:id' , (req, res) => {
    Guests.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedGuest) => {
        res.json(updatedGuest);
    });
});

module.exports = router;
