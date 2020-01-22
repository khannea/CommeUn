const mongoose = require('mongoose');

const Schema = mongoose.Schema;
// Duplicate the ID field.

let Dislike = new Schema({
  msgId:{
    type: String
  },
  user:{
    type: String
  },
});

Dislike.set('toObject', { virtuals: true })
Dislike.set('toJSON', { virtuals: true })


module.exports = mongoose.model('Dislike', Dislike)
