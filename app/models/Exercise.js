const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const Exercise = new mongoose.Schema({
  for_userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  description: {type: String, required: true},
  duration: {type: Number, required: true},
  date: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Exercise', Exercise);