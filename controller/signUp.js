const userModel = require('../models/signUp');

exports.renderSignUpPage = (req, res) => {
  userModel.createUserTable();
  res.render('signUp');
};

exports.addUsers = (req, res) => {
  userModel.addUser(req, () => {
    res.redirect(`/${req.body.uname}`);
  });
};

exports.profile = (req, res) => {
  console.log(req.params);
  res.render('profile', { name: req.params.username });
};

exports.sum = (num1, num2) => num1 + num2;
