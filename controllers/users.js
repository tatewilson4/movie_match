const express = require('express');
const router = express.Router();
const User = require('../models/users.js');
const bycrypt = require('bcrypt');

// router.get('/' , (req, res) => {
//     res.render('users/')
// })

router.post('/' , (req, res) => {
    req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
    User.create(req.body, (err, createdUser) => {
        res.redirect('/');
    });
});

module.exports = router;
