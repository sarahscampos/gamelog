const mongoose = require("mongoose");

const forumSchema = mongoose.Schema(
  new mongoose.Schema(
    {
      gameId: { type: String, required: true, unique: true },
      comentarios: [
        {
          userId: { type: String, required: true },
          comentId: { type: Number, required: true, unique: true },
          coment: { type: String, required: true, minlength: 1, maxlength: 500 },
          data: {type: Date}
        },
      ],
    },
    { timestamps: true }
  )
);

module.exports = mongoose.model('ForumSchema', forumSchema);