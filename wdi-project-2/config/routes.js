//b.1 require express
const express = require('express');
//b.2 link to router and save in a variable
const router  = express.Router();
//b.3 require statics
const statics = require('../controllers/statics');
//Require registration and sessions
const registrations  = require('../controllers/registrations');
const sessions       = require('../controllers/sessions');

// b.4 start to create roots
//A home route
router.get('/', (req, res) => res.render('homepage'));

router.route('/')
  .get(statics.index);

router.route('/register')//  /register is the place URL
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

//b.5 export router
module.exports = router;
