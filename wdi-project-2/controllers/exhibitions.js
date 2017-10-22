
//***************************************************************************
const Exhibition = require('../models/exhibition');


// function exhibitionsNew(req, res) { //(b)
//   res.render('exhibitions/new');
// }


function exhibitionsCreate(req, res) {
  Exhibition
    .find()
    .exec()
    .then((exhibitions) => {
      res.render('exhibitions/index', { exhibitions });
    })
    .catch((err) => {
      res.status(500).end(err);
    });
}


module.exports = {
  // new: exhibitionsNew,
  create: exhibitionsCreate
};
//*******************************************************************************
