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

module.exports.createUserTable = (client) => {
  client.query(createUserTableQuery, (err) => {
    if (err) {
      console.error(err);
    }
  });
};

// why sending the wbole req body?
module.exports.addUser = (req, cb) => {
  const insert = `INSERT INTO users(emailid, password, name, handle, joinedon) 
    VALUES('${req.body.email}','${req.body.password}','${req.body.name}','${req.body.uname}', current_timestamp);`;

  req.app.dbClient.query(insert, (err, response) => {
    console.log(err, response);
    cb();
  });
};
