exports.logOutUsers = (req, res) => {
  res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
  delete req.session.user;
  req.session.destroy(() => {
    res.redirect('/logIn');
  });
};
