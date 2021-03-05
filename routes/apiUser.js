const express = require('express');
const profilePage = require('../controller/profile.js');
const logIn = require('../controller/logIn.js');

const apiUser = express.Router();

apiUser.get('/:username', profilePage.apiGetTweets);
apiUser.post('/logIn', logIn.apiLogInUsers);

module.exports = apiUser;
