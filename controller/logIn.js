const jwt = require('jsonwebtoken');
const userModel = require('../models/logIn');

const usersController = {
  renderLoginPage(req, res) {
    res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
    if (req.session.user) {
      return res.redirect(`/${req.session.user.uname}`);
    }
    return res.render('logIn', { message: '' });
  },

  logInUsers(req, res) {
    res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
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

  apiLogInUsers(req, res) {
    const { dbClient } = req.app;
    const { email } = req.body;
    const { password } = req.body;
    return userModel.getUser(dbClient, email, password, (err, response) => {
      if (err) {
        return res.json({ login: false, error: 'Error Occured in database', token: null });
      } if (response.rowCount > 0) {
        req.session.user = { email, password, uname: response.rows[0].handle };
        const token = jwt.sign({ email }, 'supersecret', { expiresIn: 120000 });
        return res.json({ login: true, error: null, token });
      }
      return res.json({ login: false, error: 'Email or Password is incorrect', token: null });
    });
  },

  redirect(req, res) {
    res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
    if (req.session.user) {
      return res.redirect(`/${req.session.user.uname}`);
    }
    return res.render('logIn', { message: '' });
  },

};

module.exports = usersController;
