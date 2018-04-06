const express = require('express');
const router = express.Router();
const User = require('../models/users.js');
const Movie = require('../models/movies.js');
const bcrypt = require('bcrypt');


router.post('/', function(req, res){
    req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
    User.create(req.body, function(err, createdUser){
        res.status(201).json({
            status:201,
            message: "user created"
        });
    });
});

router.put('/:username' , (req, res) => {
    User.findOneAndUpdate({username: req.params.username}, {user_list: req.body}, {new:true}, (err, updatedUser) => {
        res.json(updatedUser);
    });
});

router.get('/:username' , (req, res) => {
    User.find({username: req.params.username}, (err, foundUsers) => {
        res.json(foundUsers);
    });
});

module.exports = router;
