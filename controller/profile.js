const userModel = require('../models/getTweets');

const getTweets = async (dbClient, email) => {
  const { result } = await userModel.getTweets(dbClient, email);
  return result.rows;
};

exports.profile = async (req, res) => {
  res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
  if (req.session.user && req.session.user.uname === req.params.username) {
    const tweets = await getTweets(req.app.dbClient, req.params.username);
    res.render('profile', { name: req.params.username, tweets });
  } else {
    res.redirect('/logIn');
  }
};
