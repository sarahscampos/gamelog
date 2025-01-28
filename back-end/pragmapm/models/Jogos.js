const mongoose = require('mongoose');

const jogoSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    nome: { type: String, required: true },
    colocacao: { type: Number, required: true },
    capa: { type: String, required: true },
    desenvolvedora: { type: String, required: true },
    dataLancamento: { type: Date, required: true },
    distribuidora: { type: String, required: true },
    generos: { type: [String], required: true },
    sumario: { type: String, required: true }
  });

module.exports = mongoose.model('Jogo', jogoSchema);