const express = require('express');
const router = express.Router();
const User = require('../models/users.js');
const bycrypt = require('bcrypt');

router.post('/' , (req, res) => {
    User.findOne({ username: req.body.username}, (err, foundUser) => {
        if(bcyrpt.compareSync(req.body.password, foundUser.password)) {
            req.session.currentUser = foundUser;
            res.redirect('/');
        } else {
            res.send('wrong password');
        }
    })
});

router.delete('/' , (req, res) => {
    req.session.destroy(() => {
        res.redirect('/');
    });
});

module.exports = router;
