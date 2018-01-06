const express = require('express');
const router  = express.Router();
const registrations  = require('../controllers/registrations');
const sessions  = require('../controllers/sessions');
const exhibitions = require('../controllers/exhibitions');
const secureRoute = require('../lib/secureRoute');


router.get('/', (req, res) => res.render('homepage'));

router.route('/exhibitions')
  .get(exhibitions.create)
  .get(exhibitions.new);

router.route('/exhibitions/:id')
  .get(exhibitions.showOne);

router.route('/register')
  .get(registrations.new)
  .post(registrations.create);

router.route('/login')
  .get(sessions.new)
  .post(sessions.create);

router.route('/logout')
  .get(sessions.delete);

router.route('/exhibitions/:id/comments')
  .post(secureRoute, exhibitions.createComment);

router.route('/exhibitions/:id/comments/:commentId')
  .delete(secureRoute, exhibitions.deleteComment);

module.exports = router;
