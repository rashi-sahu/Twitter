module.exports.getTweets = async (client, email) => {
  const select = `select t.description from tweets t inner join users u on u.id = t.createdby where u.emailid = '${email}';`;

  let err = null;
  let result = null;
  try {
    result = await client.query(select);
    err = null;
  } catch (e) {
    err = e;
    result = null;
  }
  return { error: err, result };
};
