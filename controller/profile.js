exports.profile = (req, res) => {
  res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
  if (req.session.user && req.session.user.uname === req.params.username) {
    res.render('profile', { name: req.params.username });
  } else {
    res.redirect('/logIn');
  }
};
