const mongoose = require('mongoose');

const listaSchema = new mongoose.Schema({
    nome: { type: String, required: true, unique: true},
    generos: { type: [String], required: true },
  });

  module.exports = mongoose.model('Lista', listaSchema)