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
    res.send('profile');
  },

};

module.exports = usersController;
