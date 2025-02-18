const mongoose = require('mongoose');

const jogoSchema = new mongoose.Schema({
    nome: { type: String, required: true, unique: true},
    colocacao: { type: Number, required: true },
    analises: {type: Number, required: true, default: 0},
    notaMedia: { type: Number, required: false},
    capa: { type: String, required: true },
    desenvolvedora: { type: String, required: true },
    dataLancamento: { type: String, required: true },
    distribuidora: { type: String, required: true },
    generos: { type: [String], required: true },
    sumario: { type: String, required: true }
  });

  module.exports = mongoose.model('Jogo', jogoSchema)