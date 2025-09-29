const port = 3000;
const express = require('express');
const session = require('express-session');
const engine = require('ejs-mate');
const methodOverride = require('method-override');
const path = require('path');
const axios = require('axios');
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User =require('./models/users');
const usersRoute = require('./routes/user');
const flash = require('connect-flash');
const {isLoggedIn} = require('./util/middleware')
const shelf = require('./models/shelfs')

try{
    mongoose.connect('mongodb://localhost:27017/BookInventory');
    console.log('Connected to database!');
}catch(error){
    handleError(error);
}

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));

const app = express();
const sessionConfig ={
    secret: 'Book-y',
    resave: false,
    saveUninitialized: true,
    cookie:{
        httpOnly: true,
        expires: Date.now() + 1000*60*60*24*7,
        maxAge: 1000*60*60*24*7
    }
};

app.engine('ejs',engine);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(session(sessionConfig));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next) =>{
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error')
    res.locals.currentUser = req.user;
    next();
})

app.use('/', usersRoute);


app.get('/', (req, res) => {
    res.redirect('home');
});

app.get('/home', (req, res) => {
    res.render('home');
});

app.get('/shelf',isLoggedIn,async (req, res) => {
    const shelfResult = await shelf.find({});
    console.log(shelfResult);
    res.render('shelf',{shelfResult});
});

app.post('/shelf',isLoggedIn,async (req, res) => {
    const shelfResult = await shelf.find({});
    console.log(shelfResult);
    res.render('shelf',{shelfResult});
});
app.get('/results',async (req, res) => {
    try {
        const userSearch = req.query.searchBar;
        const config = { params: { q: userSearch } };
        const response = await axios.get('https://openlibrary.org/search.json?',config);
        const pass = response.data;
        res.render('results', {pass,userSearch});
        
    } catch (error) {
        console.error('Error fetching external data:', error);
        res.status(500).json({ message: 'Error fetching data from external API' });
    }
});



app.listen(3000, () => {
    console.log(`Listening on port ${port}`);
});
