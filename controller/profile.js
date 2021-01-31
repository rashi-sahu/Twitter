exports.profile = (req, res) => {
  if (req.session.user) {
    res.render('profile', { name: req.params.username });
  } else {
    res.redirect('/logIn');
  }
};
