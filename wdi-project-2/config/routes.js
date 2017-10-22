const express = require('express');
const router  = express.Router();
const statics = require('../controllers/statics');
const registrations  = require('../controllers/registrations');
const sessions       = require('../controllers/sessions');

router.get('/', (req, res) => res.render('homepage'));

router.route('/')
  .get(statics.index);

router.route('/register')
  .get(registrations.new)
  .post(registrations.create);

router.route('/login')
  .get(sessions.new)
  .post(sessions.create);

// RESTful routes
// All URLS should contain the PLURAL... don't chose octopus or people or something silly.
// INDEX
// NEW
// SHOW
// CREATE
// EDIT
// UPDATE
// DELETE

module.exports = router;
