const User = require('../models/user');

function sessionsNew(req, res) {
  res.render('sessions/new');
}

function sessionsCreate(req, res, next) {
  User
    .findOne({ email: req.body.email })
    .then((user) => {
      if(!user || !user.validatePassword(req.body.password)) {
        req.flash('danger', 'Unknown email/password combination');
        // console.log(user);
        return res.redirect('/login');
      }
      console.log(user);
      req.flash('success', `Welcome back, ${user.username}!`);
      req.session.userId = user.id;
      req.session.isAuthenticated = true;
      req.user = user;
      res.redirect('/');
    });
}

function sessionsDelete(req, res) {
  return req.session.regenerate(() => {
    req.flash('success', 'You successfully logged out.');
    res.redirect('/');
  });
}



module.exports = {
  new: sessionsNew,
  create: sessionsCreate,
  delete: sessionsDelete
};
