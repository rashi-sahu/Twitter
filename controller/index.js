const express = require('express');
const client = require('./databaseQueries/databaseConnection.js');

const app = express();
const signUp = require('./signUp.js');

const createUserTable = `
CREATE TABLE IF NOT EXISTS users (
    Id serial PRIMARY KEY,
    emailId varchar(100) UNIQUE NOT NULL,
    password varchar(1000) NOT NULL,
    name varchar(100) NOT NULL,
    handle varchar(30) UNIQUE NOT NULL,
    dateOfBirth timestamptz,
    joinedOn timestamptz,
    description varchar(100),
    country varchar(100),
    state varchar(100),
    city varchar(100)
);
`;

client.query(createUserTable, (err) => {
  if (err) {
    console.error(err);
    return;
  }

  client.end();
});

app.use('/', signUp);
