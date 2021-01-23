const express = require('express');
const bodyparser = require('body-parser');

const app = express();
const signUp = require('./routes/user.js');

const port = 8000;

app.set('view engine', 'ejs');

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use('/', signUp);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
