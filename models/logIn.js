const client = require('./databaseConnection.js');

const getSelectQueryByEmail = (email, password) => `select * from users where emailid = '${email}' and password = '${password}'`;

module.exports.getUser = (email, password, cb) => {
  const select = getSelectQueryByEmail(email, password);
  client.query(select, (err, response) => {
    cb(err, response);
  });
};

// module.exports.getUser1 = (req, cb, client) => return cb();

// const { Client } = require('pg');

// const testGetUserReturnZeroRowsIfEmailNotFound = () => {
//   const client = new Client({
//     user: 'postgres',
//     host: 'localhost',
//     database: 'twitter_test',
//     password: 'p',
//     port: 5432,
//   });
//   client.connect();

//   client.query('create table', function (err, response) {
//     const email = 'blah';
//     const numberOfCalls = 0;
//     let actualRowCount;
//     const y = (arg) => { actualRowCount = arg.rowCount; };
//     this.getUser(email, y, client);
//     expect(actualRowCount).to.equal(0);
//     client.query('delete table', (err, res) => {});
//   });
// };

// const testGetUserReturnOneRowIfUserFound = () => {
//   const client = new Client({
//     user: 'postgres',
//     host: 'localhost',
//     database: 'twitter_test',
//     password: 'p',
//     port: 5432,
//   });
//   client.connect();

//   client.query('create table', (err, response) => {
//     client.query('insert blah into table', function (err, response) {
//       const email = 'blah';
//       const numberOfCalls = 0;
//       let actualRowCount;
//       let emailid;
//       const y = (arg) => { actualRowCount = arg.rowCount, emailid = arg.rows[0].emailid; };
//       this.getUser(email, y, client);
//       expect(actualRowCount).to.equal(1);
//       expect(emailid).to.equal(email);
//       client.query('delete table', (err, res) => {});
//     });
//   });
// };

// const testGetUserReturnOneRowIfUserFound = () => {
//     const client = new Client({
//       user: 'postgres',
//       host: 'localhost',
//       database: 'twitter_test',
//       password: 'p',
//       port: 5432,
//     });

//     const email = 'blah';
//     let errorCount=0;
//     const y = (err, arg) => { if(err!=null){errorCount++;}};
//     this.getUser(email, y, client);
//     expect(errorCount).to.equal(1);
//   };
