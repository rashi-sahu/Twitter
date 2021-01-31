const userModel = require('../models/addTweet');

exports.addTweets = (req, res) => {
  console.log(req);
  userModel.addTweet(req.app.dbClient, req.body.tweetDescription, req.session.user.email, (err) => {
    console.log('print error');
    return res.redirect(`/${req.session.user.uname}`);
  });
};
