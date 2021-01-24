const userModel = require('../models/signUp');

const usersController = {
  renderSignUpPage(req, res) {
    userModel.createUserTable();
    res.render('signUp');
  },

  addUsers(req, res) {
    userModel.addUser(req, () => {
      res.redirect('/profile');
    });
  },

  profile(req, res) {
    res.render('profile', { name: 'Rashi' });
  },

  sum(num1, num2) {
    return num1 + num2;
  },

};

module.exports = usersController;
