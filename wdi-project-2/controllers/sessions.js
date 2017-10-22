const User = require('../models/user');

function sessionsNew(req, res) {
  res.render('sessions/new');
}

//take imputted email, find user in the database, check if password matches existing, if either dont match display error

//Would like more details on how this function works////////////////////////////////////////
function sessionsCreate(req, res) {
  User
    .findOne({ email: req.body.email })
    .then((user) => {
      if(!user || !user.validatePassword(req.body.password)) {
        req.flash('danger', 'Unknown email/password combination');
        console.log(user);
        return res.redirect('/login');
      }

      req.session.userId = user.id;
      req.session.isAuthenticated = true;

      req.user = user;

      req.flash('success', `Welcome back, ${user.username}!`);
      res.redirect('/');
    });
  // .catch(next);
}





module.exports = {
  new: sessionsNew,
  create: sessionsCreate
};
