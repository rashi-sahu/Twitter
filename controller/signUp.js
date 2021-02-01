const userModel = require('../models/signUp');

exports.renderSignUpPage = (req, res) => {
  res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
  if (req.session.user) {
    return res.redirect(`/${req.session.user.uname}`);
  }
  return res.render('signUp', { message: '' });
};

exports.addUsers = (req, res) => {
  res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
  userModel.addUser(req.app.dbClient, req.body, (err) => {
    if (!err) {
      req.session.user = req.body;
      res.redirect(`/${req.body.uname}`);
    } else {
      res.render('signUp', { message: 'some error occured, try again' });
    }
  });
};
