const client = require('./databaseConnection.js');

module.exports.getUser = (req, cb) => {
  const select = `select * from users where emailid = '${req.body.email}'`;

  client.query(select, (err, response) => {
    cb(response);
  });
};
