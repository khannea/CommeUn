const mongoose = require('mongoose');

const Schema = mongoose.Schema;
// Duplicate the ID field.

let Like = new Schema({
  msgId:{
    type: String
  },
  user:{
    type: String
  },
});

Like.set('toObject', { virtuals: true })
Like.set('toJSON', { virtuals: true })

module.exports = mongoose.model('Like', Like)
