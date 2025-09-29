const express = require('express');
const router = express.Router();
const User = require('../models/users');
const passport = require('passport')
const {isLoggedIn} = require('../util/middleware')

router.get('/signin', (req, res) => {
    res.render('users/signin');
});

router.post('/signin', async (req, res) => {
    try {
        const { firstName, lastName, email, username, password } = req.body;
        const user = new User({ firstName, lastName, email, username, password });
        const registeredUser = await User.register(user, password);
        req.flash('sucess','Account created succesfully')
        res.redirect('home');
    }catch(e){
        req.flash('error',`Error: ${e.message}`);
        res.redirect('signin');
    }
    
});

router.get('/login', (req, res) => {
    res.render('users/login');
});

router.post('/login', passport.authenticate('local',{failureFlash: true, failureRedirect:'login'}),(req, res) => {
    req.flash('success','Welcome!')
    res.redirect('home')
});

router.get('/logout', (req,res,next) =>{
    req.logOut(function(err){
        if(err){
            return next(err);
        }
        req.flash('success','You have been logged out!')
        res.redirect('home');
    })
})

module.exports = router;