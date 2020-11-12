require('dotenv').config();
const express = require('express');
const bParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');

const app = express();
app.set('view engine', 'ejs');
app.use(bParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(session({
    secret: 'ThisisalongSecret',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

mongoose.connect('mongodb://localhost:27017/userDB',
    { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.set('useCreateIndex', true)

const userSchema = new mongoose.Schema({ email: String, password: String });
userSchema.plugin(passportLocalMongoose);

const User = mongoose.model('User', userSchema);
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get('/', function (req, res) {
    res.render('home');
});

app.route('/register')
    .get(function (req, res) {
        res.render('register');
    })
    .post(function (req, res) {
    });

app.route('/login')
    .get(function (req, res) {
        res.render('login');
    })
    .post(function (req, res) {
    });

app.listen(3000, function () {
    console.log('Server started at post 3000');
})
