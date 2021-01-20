const express = require('express');

const app = express();
const { Client } = require('pg');
const signUp = require('./signUp.js');

const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'twitter',
  password: 'p',
  port: 5432,
});

client.connect();

const isUserTableExist = `
SELECT EXISTS (
  SELECT FROM information_schema.tables 
  AND  table_name   = 'users'
);
`;

const createUserTable = `
CREATE TABLE users (
    Id int,
    emailId varchar[100],
    password varchar[1000],
    name varchar[100],
    handle varchar[30],
    dateOfBirth timestamptz,
    joinedOn timestamptz,
    description varchar[100],
    country varchar[100],
    state varchar[100],
    city varchar[100]
);
`;

if (!isUserTableExist) {
  client.query(createUserTable, (err) => {
    if (err) {
      console.error(err);
      return;
    }

    client.end();
  });
}

app.use('/', signUp);
