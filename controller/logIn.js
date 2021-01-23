const userModel = require('../models/logIn');

const usersController = {
  renderLoginPage(req, res) {
    res.render('logIn', { message: '' });
  },

  logInUsers(req, res) {
    userModel.getUser(req, (response) => {
      if (response.rowCount > 0) {
        console.log(response.rows[0]);
        res.redirect('/profile');
      } else {
        res.render('logIn', { message: 'Email or Password is incorrect' });
      }
    });
  },

};

module.exports = usersController;
