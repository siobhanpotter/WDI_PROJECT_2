const User = require('../models/user');

//Function that renders the registration form
function registrationsNew(req, res) {
  res.render('registrations/new');
}

//Function to create the new user
function registrationsCreate(req, res) {
  User
    .create(req.body)
    .then((user) => {
      res.redirect('/');
    })
    .catch((err) => res.status(500).end(err));
}


module.exports = {
  new: registrationsNew,
  create: registrationsCreate
};
