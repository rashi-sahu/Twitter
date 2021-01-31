module.exports.addTweet = (client, tweetDescription, email, cb) => {
  const insert = `INSERT INTO tweets(Description, CreatedBy, CreatedOn, HasChild, IsDeleted) 
      Select '${tweetDescription}', id, current_timestamp, '0', '0' 
      from users
      where emailid = '${email}';`;

  let err = null;
  try {
    client.query(insert);
  } catch (e) {
    err = e;
  }
  cb(err);
};
