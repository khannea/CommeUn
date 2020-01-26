const mongoose = require("mongoose");

const Schema = mongoose.Schema;
// Duplicate the ID field.

let Post = new Schema({
  // topicId:{
  //   type: String
  // },
  originId: {
    type: String
  },
  user: {
    type: String
  },
  texte: {
    type: String
  },
  date: {
    type: String
  },
  likes: {
    type: Number,
    default: 0
  },
  dislikes: {
    type: Number,
    default: 0
  }
});

Post.set("toObject", { virtuals: true });
Post.set("toJSON", { virtuals: true });

module.exports = mongoose.model("Post", Post);
