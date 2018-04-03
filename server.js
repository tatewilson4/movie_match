const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const bcrypt = require('bcrypt');


app.use(bodyParser.json());
app.use(express.static('public'));
//session middleware
app.use(express.urlencoded({extended:false}));
app.use(session({
    secret: "feedmeseymour",
    resave: false,
    saveUninitialized: false
}));


const moviesController = require('./controllers/movies.js');
app.use('/movies', moviesController);
//users
const userController = require('./controllers/users.js');
app.use('/users' , userController);
//sessions
const sessionController = require('./controllers/sessions.js');
app.use('/session' , sessionController);

app.get('/' , (req, res) => {
    res.render('index.html' , {
        currentUser: req.session.currentUser
    });
});

const User = require('./models/users.js');


mongoose.connect('mongodb://localhost:27017/movies');
mongoose.connection.once('open', ()=>{
    console.log('connected to mongo');
});

app.listen(3000, ()=>{
    console.log('listening');
});
