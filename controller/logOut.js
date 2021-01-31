exports.logOutUsers = (req, res) => {
  req.session.destroy(() => {
    res.redirect('/logIn');
  });
};
