const mongoose = require('mongoose');

//Esquema classe avaliação
const avaliacaoSchema = new mongoose.Schema({

    username: { type: String, required: true, trim: true },
    comment: { type: String, maxlength: 500 },
    score: { type: Number, required: true },
    like: { type: Number, default: 0},
    dislike: { type: Number, default: 0},
    idJogo: { type: mongoose.Schema.Types.ObjectId, required: true },

}, { timestamp: true });

module.exports = mongoose.model('Avaliacao', avaliacaoSchema);