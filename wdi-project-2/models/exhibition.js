const mongoose = require('mongoose');

//****************************************************************************
const commentSchema = new mongoose.Schema({
  content: { type: String, required: true },
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'User', required: true }
}, {
  timestamps: true
});

commentSchema.methods.belongsTo = function commentBelongsTo(user) {
  if(typeof this.createdBy.id === 'string') return this.createdBy.id === user.id;
  return user.id === this.createdBy.toString();
};
//***************************************************************************


const exhibitionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  exhibitionDate: { type: String },
  synopsis: { type: String },
  discipline: { type: String },
  image: [{ type: String }],
  comments: [ commentSchema ]
});


module.exports = mongoose.model('Exhibition', exhibitionSchema);
