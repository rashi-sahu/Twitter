// why sending the wbole req body?
module.exports.addUser = (req, cb) => {
  const insert = `INSERT INTO users(emailid, password, name, handle, joinedon) 
    VALUES('${req.body.email}','${req.body.password}','${req.body.name}','${req.body.uname}', current_timestamp);`;

  req.app.dbClient.query(insert, (err, response) => {
    console.log(err, response);
    cb();
  });
};
