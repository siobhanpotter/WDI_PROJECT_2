
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


// function showOneExhibition(req, res) {
//   Exhibition
//     .findOne({ name: req.params.name })
//     .exec()
//     .then((exhibition) => {
//       if(!exhibition) return res.status(404).end();
//       res.render('exhibition/show', { exhibition });
//     })
//     .catch(() => {
//       res.status(500).end();
//     });
// }



function showOneExhibition(req, res, next) {
  Exhibition
    .findById(req.params.id)
    // .populate('hello')
    .exec()
    .then(exhibition => {
      if(!exhibition) return res.notFound();
      return res.render('exhibitions/show', { exhibition });
    })
    .catch(next);
}


module.exports = {
  // new: exhibitionsNew,
  create: exhibitionsCreate,
  showOne: showOneExhibition
};
//*******************************************************************************
