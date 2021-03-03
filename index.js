const express = require('express');
const bodyparser = require('body-parser');
const session = require('express-session');
const dbConnector = require('./helper/databaseConnection');

const app = express();
const html = require('./routes/user.js');
const json = require('./routes/apiUser.js');

const port = 8000;

app.set('view engine', 'ejs');

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(session({ secret: 'Your secret key' }));
app.use('/', html);
app.use('/api', json);

dbConnector.connect().then((dbClient) => {
  app.listen(port, () => {
    app.dbClient = dbClient;
    console.log(`Twitter app listening on port ${port}!`);
  });
}).catch((err) => {
  console.log('error connecting to datbase', err);
});
