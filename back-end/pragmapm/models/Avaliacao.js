const mongoose = require('mongoose');

//Esquema classe avaliação
const avaliacaoSchema = new mongoose.Schema({
    gameId: {type: String, required: true, unique: true},
    avaliacoes: [{
        userId: { type: String, required: true },
        avaliacaoId: { type: String, required: true, unique:true},
        coment: { type: String, maxlength: 500 },
        score: {type: Number, required: true}
    }]
}, {timestamp: true});

module.exports = mongoose.model('Avaliacao', avaliacaoSchema);