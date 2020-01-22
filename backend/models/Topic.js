const mongoose = require('mongoose');

const Schema = mongoose.Schema;
// Duplicate the ID field.

let Topic = new Schema({
  titre:{
    type: String
  },
  user:{
    type: String
  }
});

Topic.set('toObject', { virtuals: true })
Topic.set('toJSON', { virtuals: true })


module.exports = mongoose.model('Topic', Topic)
