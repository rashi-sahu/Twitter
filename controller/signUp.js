const userModel = require('../models/signUp');

exports.renderSignUpPage = (req, res) => {
  res.render('signUp', { message: '' });
};

exports.addUsers = (req, res) => {
  userModel.addUser(req.app.dbClient, req.body, (err) => {
    if (!err) {
      res.redirect(`/${req.body.uname}`);
    } else {
      res.render('signUp', { message: 'some error occured, try again' });
    }
  });
};

exports.profile = (req, res) => {
  res.render('profile', { name: req.params.username });
};
