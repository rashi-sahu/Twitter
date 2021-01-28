module.exports.addUser = (client, req, cb) => {
  const insert = `INSERT INTO users(emailid, password, name, handle, joinedon) 
    VALUES('${req.email}','${req.password}','${req.name}','${req.uname}', current_timestamp);`;

  let err = null;
  try {
    client.query(insert);
  } catch (e) {
    err = e;
  }
  cb(err);
};
