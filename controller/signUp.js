const userModel = require('../models/signUp');

exports.renderSignUpPage = (req, res) => {
  res.render('signUp', { message: '' });
};

exports.addUsers = (req, res) => {
  userModel.addUser(req.app.dbClient, req.body, (err) => {
    if (!err) {
      req.session.user = req.body;
      res.redirect(`/${req.body.uname}`);
    } else {
      res.render('signUp', { message: 'some error occured, try again' });
    }
  });
};
