const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const Schema = mongoose.Schema;
// Duplicate the ID field.

const saltRounds = 10;

let User = new Schema({
  pseudo:{
    type: String
  },
  password:{
    type: String
  },
  budget:{
    type: Number,
    default: 0
  }
}, { collection: 'authentification' });

User.pre('save', function(next) {
  // Check if document is new or a new password has been set
  if (this.isNew || this.isModified('password')) {
    // Saving reference to this because of changing scopes
    const document = this;
    bcrypt.hash(document.password, saltRounds,
      function(err, hashedPassword) {
      if (err) {
        next(err);
      }
      else {
        document.password = hashedPassword;
        next();
      }
    });
  } else {
    next();
  }
});

User.methods.isCorrectPassword = function(password, callback){
  bcrypt.compare(password, this.password, function(err, same) {
    if (err) {
      callback(err);
    } else {
      callback(err, same);
    }
  });
}

User.set('toObject', { virtuals: true })
User.set('toJSON', { virtuals: true })


module.exports = mongoose.model('User', User)
