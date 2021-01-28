const userModel = require('../models/logIn');

const usersController = {
  renderLoginPage(req, res) {
    res.render('logIn', { message: '' });
  },

  logInUsers(req, res) {
    userModel.getUser(req.app.dbClient, req.body.email, req.body.password, (err, response) => {
      if (err) {
        res.render('logIn', { message: 'Error Occured in database' });
      } else if (response.rowCount > 0) {
        console.log(response.rows[0]);
        res.redirect(`/${response.rows[0].handle}`);
      } else {
        res.render('logIn', { message: 'Email or Password is incorrect' });
      }
    });
  },

  redirect(req, res) {
    res.redirect('/logIn');
  },

};

module.exports = usersController;
