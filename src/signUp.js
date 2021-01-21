const express = require('express');

const signUp = express();
const port = 8000;

signUp.get('/', (req, res) => {
  res.send('Hello World!');
});

signUp.get('/signUp', (req, res) => {
  res.sendFile('views/signUp.html', { root: '.' });
});

signUp.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});

module.exports = signUp;
