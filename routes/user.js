const express = require('express');
const signUp = require('../controller/signUp.js');
const logIn = require('../controller/logIn.js');

const user = express.Router();

user.get('/signUp', signUp.renderSignUpPage);

user.post('/signUp', signUp.addUsers);

user.get('/logIn', logIn.renderLoginPage);

user.post('/logIn', logIn.logInUsers);

user.get('/logout', logIn.logOutUsers);

user.get('/', logIn.redirect);

user.get('/:username', signUp.profile);

module.exports = user;
