const client = require('./databaseConnection.js');

const getSelectQueryByEmail = (email, password) => `select * from users where emailid = '${email}' and password = '${password}'`;

module.exports.getUser = (email, password, cb) => {
  const select = getSelectQueryByEmail(email, password);
  client.query(select, (err, response) => {
    cb(err, response);
  });
};
