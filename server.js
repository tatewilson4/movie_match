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
app.use('/sessions' , sessionController);

const guestsController = require('./controllers/guests.js');
app.use('/guests' , guestsController);

app.get('/sessions', function(req, res){
    if(req.session.currentuser){
        res.json(req.session.currentuser);
    } else {
        res.status(401).json({
            status:401,
            message:'not logged in'
        });
    }
});


const User = require('./models/users.js');
const mongoUri =  process.env.MONGODB_URI || 'mongodb://localhost:27017/movies';
 mongoose.connect(mongoUri);
const port = process.env.PORT || 3000;
app.listen(port);
console.log('---------------------------------');
console.log('Server running on port: ' + port);
console.log('---------------------------------');


// mongoose.connect('mongodb://localhost:27017/movies');
// mongoose.connection.once('open', ()=>{
//     console.log('connected to mongo');
// });
//
// app.listen(3000, ()=>{
//     console.log('listening');
// });
