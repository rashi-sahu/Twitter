const client = require('./databaseConnection.js');

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

module.exports.createUserTable = () => {
  client.query(createUserTableQuery, (err) => {
    if (err) {
      console.error(err);
    }
  });
};

module.exports.addUser = (req, cb) => {
  const insert = `INSERT INTO users(emailid, password, name, handle, joinedon) 
    VALUES('${req.body.email}','${req.body.password}','${req.body.uname}','${req.body.uname}','2020-06-22 19:10:25-07');`;

  client.query(insert, (err, response) => {
    console.log(err, response);
    cb();
  });
};