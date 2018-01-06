const User = require('../models/user');

//render the registration form
function registrationsNew(req, res) { //(b)
  res.render('registrations/new');
}

// create the new user
function registrationsCreate(req, res, next) {
  User
    .create(req.body)
    .then((user) => {
      req.flash('info', `Thanks for registering, ${user.username}!`);
      res.redirect('/login');
      console.log(user);
      console.log(req.body);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).render('registrations/new', { message: 'Passwords do not match' });
      }
      res.status(500).end();
    });
}

module.exports = {
  new: registrationsNew,
  create: registrationsCreate
};
