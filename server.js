const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const bcrypt = require('bcrypt');
const methodOverride = require('method-override');

app.use(bodyParser.json());
app.use(express.static('public'));
//session middleware
app.use(session({
    secret: "feedmeseymour",
    resave: false,
    saveUninitialized
}));
app.use(methodOverride('_method'));

const moviesController = require('./controllers/movies.js');
app.use('/movies', moviesController);
//users
const userController = require('./controllers/users.js');
app.use('/movies' , usersController);
//sessions
const sessionController = require('./controllers/sessions.js');
app.use('/movies' , sessionController);

app.get('/' , (req, res) => {
    res.render('index.ejs' , {
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
