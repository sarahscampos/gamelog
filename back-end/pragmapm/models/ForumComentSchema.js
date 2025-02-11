const mongoose = require("mongoose");

const forumComentSchema = mongoose.Schema(
  new mongoose.Schema(
    {
      gameId: { type: mongoose.Schema.Types.ObjectId, required: true },
      username: { type: String, required: true },
      coment: { type: String, required: true, minlength: 1, maxlength: 500 }
    },
    { timestamps: true }
  )
);

module.exports = mongoose.model('ForumComentSchema', forumComentSchema);