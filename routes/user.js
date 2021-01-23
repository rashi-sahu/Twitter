const express = require('express');
const signUp = require('../controller/signUp.js');
const logIn = require('../controller/logIn.js');

const user = express.Router();

user.get('/signUp', signUp.renderSignUpPage);

user.post('/signUp', signUp.addUsers);

user.get('/profile', signUp.profile);

user.get('/logIn', logIn.renderLoginPage);

user.post('/logIn', logIn.logInUsers);

module.exports = user;
