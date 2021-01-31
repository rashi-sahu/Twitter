const clientConnector = require('./databaseConnection');

const createUserTableQuery = `
CREATE TABLE IF NOT EXISTS users (
    Id serial PRIMARY KEY,
    emailId varchar(100) UNIQUE NOT NULL,
    password varchar(1000) NOT NULL,
    name varchar(100) NOT NULL,
    handle varchar(30) UNIQUE NOT NULL,
    dateOfBirth timestamptz,
    joinedOn timestamptz NOT NULL,
    description varchar(100),
    country varchar(100),
    state varchar(100),
    city varchar(100)
);
`;

const createTweetTableQuery = `
CREATE TABLE IF NOT EXISTS tweets (
    Id serial PRIMARY KEY,
    Description varchar(280) NOT NULL,
    CreatedBy int NOT NULL,
    CreatedOn timestamptz NOT NULL,
    HasChild bit DEFAULT '0' NOT NULL ,
    IsDeleted bit DEFAULT '0' NOT NULL 
);
`;

clientConnector.connect().then(async (dbClient) => {
  await dbClient.query(createUserTableQuery);
  await dbClient.query(createTweetTableQuery);
  console.log('sucessfully created tables');
  dbClient.end();
}).catch((err) => {
  console.log('error', err);
});
