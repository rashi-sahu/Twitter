const express = require('express');
const bodyparser = require('body-parser');
const client = require('../models/databaseConnection.js');

const signUp = express();
const port = 8000;
signUp.set('view engine', 'ejs');

signUp.use(bodyparser.urlencoded({ extended: false }));
signUp.use(bodyparser.json());

signUp.get('/', (req, res) => {
  res.send('Hello World!');
});

signUp.get('/signUp', (req, res) => {
  res.render('signUp');
});

signUp.post('/signUp', (req, res) => {
  const insert = `INSERT INTO users(emailid, password, name, handle, joinedon) 
  VALUES('${req.body.email}','${req.body.password}','${req.body.uname}','${req.body.uname}','2020-06-22 19:10:25-07');`;
  console.log('insert query', insert);

  client.query(insert,
    (err, response) => {
      console.log(err, response);
      client.end();
    });
});

signUp.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});

module.exports = signUp;
