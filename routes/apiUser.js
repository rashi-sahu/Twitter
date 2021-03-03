const express = require('express');
const profilePage = require('../controller/profile.js');

const apiUser = express.Router();

apiUser.get('/:username', profilePage.apiGetTweets);

module.exports = apiUser;
