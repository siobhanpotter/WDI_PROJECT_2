const User = require('../models/user');

function sessionsNew(req, res) {
  res.render('sessions/new');
}

//take imputted email, find user in the database, check if password matches existing, if either dont match display error


function sessionsCreate(req, res, next) {////!!!!!!!!!!!!!!!!!!!!!!!!!!!!next may be a problem
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
      // req.flash('success', `${user.username}, you\'ve logged in!`);

      res.redirect('/');
    });
  // .catch(next);
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
