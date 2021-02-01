const userModel = require('../models/addTweet');

exports.addTweets = (req, res) => {
  console.log(req);
  userModel.addTweet(req.app.dbClient, req.body.tweetDescription, req.session.user.email, (err) => res.redirect(`/${req.session.user.uname}`));
};
