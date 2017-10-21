
const User = require('../models/user');


///////////////I dont know what this does
function staticsIndex(req, res) {
  User
    .find()
    .exec()
    .then((users) => res.render('statics/index', { users }));
}

module.exports = {
  index: staticsIndex
};
