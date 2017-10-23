const mongoose = require('mongoose');

const exhibitionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  exhibitionDate: { type: String },
  synopsis: { type: String },
  discipline: { type: String },
  image: [{ type: String }]
});

module.exports = mongoose.model('Exhibition', exhibitionSchema);