const userModel = require('../models/logIn');

const usersController = {
  renderLoginPage(req, res) {
    res.render('logIn', { message: '' });
  },

  logInUsers(req, res) {
    const { dbClient } = req.app;
    const { email } = req.body;
    const { password } = req.body;
    return userModel.getUser(dbClient, email, password, (err, response) => {
      if (err) {
        return res.render('logIn', { message: 'Error Occured in database' });
      } if (response.rowCount > 0) {
        req.session.user = { email, password, uname: response.rows[0].handle };
        return res.redirect(`/${response.rows[0].handle}`);
      }
      return res.render('logIn', { message: 'Email or Password is incorrect' });
    });
  },

  redirect(req, res) {
    res.redirect('/logIn');
  },

};

module.exports = usersController;
