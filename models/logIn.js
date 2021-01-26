const getSelectQueryByEmail = (email, password) => `select * from users where emailid = '${email}' and password = '${password}'`;

module.exports.getUser = async (client, email, password, cb) => {
  const select = getSelectQueryByEmail(email, password);
  let err;
  let result;
  try {
    result = await client.query(select);
    err = null;
  } catch (e) {
    err = e;
    result = null;
  }
  cb(err, result);
};
