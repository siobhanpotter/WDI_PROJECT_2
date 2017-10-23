const express = require('express');
const router  = express.Router();
// const statics = require('../controllers/statics');
const registrations  = require('../controllers/registrations');
const sessions  = require('../controllers/sessions');
const exhibitions = require('../controllers/exhibitions');


router.get('/', (req, res) => res.render('homepage'));

// router.route('/')
//   .get(statics.index);

// function secureRoute(req, res, next) {
//   if (!req.session.userId) {
//     return req.session.regenerate(() => {
//       req.flash('danger', 'You must be logged in.');
//       res.redirect('/login');
//     });
//   }

//   return next();
// }


// router.get('/exhibitions', (req, res) => {
//   Exhibition
//     .find()
//     .exec()
//     .then((exhibitions) => {
//       res.render('exhibitions', { exhibitions });
//     })
//     .catch((err) => {
//       res.status(500).end(err);
//     });
// });

router.route('/exhibitions')
  .get(exhibitions.create);


router.route('/exhibitions/:id')
  .get(exhibitions.showOne);


// .put(secureRoute, exhibitionsController.update)
// .delete(secureRoute, exhibitionsController.delete);

// router.get('/exhibitions/:name', (req, res) => {
//   Exhibition
//     .findOne({ name: req.params.name })
//     .exec()
//     .then((exhibition) => {
//       if(!exhibition) return res.status(404).end();
//       res.render('exhibition', { exhibition });
//     })
//     .catch(() => {
//       res.status(500).end();
//     });
// });


router.route('/register')
  .get(registrations.new)
  .post(registrations.create);

router.route('/login')
  .get(sessions.new)
  .post(sessions.create);

router.route('/logout')
  .get(sessions.delete);

//****************************************************************************
router.route('/exhibitions/:id/comments')
  .post(exhibitions.createComment);

router.route('/exhibitions/:id/comments/:commentId')
  .delete(exhibitions.deleteComment);
//*****************************************************************************

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
