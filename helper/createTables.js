const clientConnector = require('./databaseConnection');

const createUserTableQuery = `
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

clientConnector.connect().then(async (dbClient) => {
  await dbClient.query(createUserTableQuery);
  console.log('sucessfully created users table');
  dbClient.end();
}).catch((err) => {
  console.log('error', err);
});
