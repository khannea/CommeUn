const mongoose = require('mongoose');

const Schema = mongoose.Schema;
// Duplicate the ID field.

let Projet = new Schema({
  titre:{
    type: String
  },
  user:{
    type: String
  },
  texte:{
    type: String
  },
  likes:{
    type: Number,
    default: 0
  },
  dislikes:{
    type: Number,
    default: 0
  }
});

Topic.set('toObject', { virtuals: true })
Topic.set('toJSON', { virtuals: true })

module.exports = mongoose.model('Projet', Projet)
