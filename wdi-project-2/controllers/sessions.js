//requires the database
const User = require('../models/user');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

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
        res.status(401).render('sessions/new', { message: 'Unrecognised credentials' });
      }
      res.redirect('/');
      req.session.userId = user._id;
    });
}



module.exports = {
  new: sessionsNew,
  create: sessionsCreate
};
