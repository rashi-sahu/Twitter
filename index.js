const express = require('express');
const bodyparser = require('body-parser');
const dbConnector = require('./helper/databaseConnection');

const app = express();
const signUp = require('./routes/user.js');

const port = 8000;

app.set('view engine', 'ejs');

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use('/', signUp);

dbConnector.connect().then((dbClient) => {
  app.listen(port, () => {
    app.dbClient = dbClient;
    console.log(`Twitter app listening on port ${port}!`);
  });
}).catch((err) => {
  console.log('error connecting to datbase', err);
});
