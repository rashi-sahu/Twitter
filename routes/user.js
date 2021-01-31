const express = require('express');
const signUp = require('../controller/signUp.js');
const logIn = require('../controller/logIn.js');
const logOut = require('../controller/logOut.js');
const profilePage = require('../controller/profile.js');
const addTweet = require('../controller/addTweet.js');

const user = express.Router();

user.get('/signUp', signUp.renderSignUpPage);

user.post('/signUp', signUp.addUsers);

user.get('/logIn', logIn.renderLoginPage);

user.post('/logIn', logIn.logInUsers);

user.get('/logout', logOut.logOutUsers);

user.post('/post/tweet', addTweet.addTweets);

user.get('/', logIn.redirect);

user.get('/:username', profilePage.profile);

module.exports = user;
