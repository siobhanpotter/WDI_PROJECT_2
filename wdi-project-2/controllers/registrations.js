
//require the the user database
const User = require('../models/user');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

//Function that renders the registration form
function registrationsNew(req, res) {
  res.render('registrations/new');
}

//Function to create the new user
//This then needs to be linked to the routes with regi
function registrationsCreate(req, res) {
  User
    .create(req.body)
    .then((user) => {
      res.redirect('/');
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
