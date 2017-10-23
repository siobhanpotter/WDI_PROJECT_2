
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

function showOneExhibition(req, res, next) {
  Exhibition
    .findById(req.params.id)
    .populate('createdBy comments.createdBy')//***************************************
    .exec()
    .then(exhibition => {
      if(!exhibition) return res.notFound();
      return res.render('exhibitions/show', { exhibition });
    })
    .catch(next);
}




//**************************************************************************
function createCommentRoute(req, res, next) {



  Exhibition
    .findById(req.params.id)
    .exec()
    .then((exhibition) => {
      if(!exhibition) return res.notFound();
      req.body.createdBy = req.session.userId;
      exhibition.comments.push(req.body); // create an embedded record
      console.log(req.body);

      return exhibition.save();

    })
    .then((exhibition) => res.redirect(`/exhibitions/${exhibition.id}`))
    .catch(next);
}

//************************************************************************
function deleteCommentRoute(req, res, next) {
  // console.log('hello');
  Exhibition
    .findById(req.params.id)
    .exec()
    .then((exhibition) => {
      if(!exhibition) return res.notFound();
      // get the embedded record by it's id
      const comment = exhibition.comments.id(req.params.commentId);
      comment.remove();

      return exhibition.save();
    })
    .then((exhibition) => res.redirect(`/exhibitions/${exhibition.id}`))
    .catch(next);
}
//**************************************************************************

module.exports = {
  // new: exhibitionsNew,
  create: exhibitionsCreate,
  showOne: showOneExhibition,
  createComment: createCommentRoute,
  deleteComment: deleteCommentRoute
};
//*******************************************************************************
