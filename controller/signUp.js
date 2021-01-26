const userModel = require('../models/signUp');

const usersController = {
  renderSignUpPage(req, res) {
    userModel.createUserTable();
    res.render('signUp');
  },

  addUsers(req, res) {
    userModel.addUser(req, () => {
      res.redirect(`/${req.body.uname}`);
    });
  },

  profile(req, res) {
    console.log(req.params);
    res.render('profile', { name: req.params.username });
  },

  sum(num1, num2) {
    return num1 + num2;
  },

};

module.exports = usersController;
