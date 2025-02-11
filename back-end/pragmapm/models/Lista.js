const mongoose = require('mongoose');

const listaSchema = new mongoose.Schema({
    nome: { type: String, required: true},
    jogosIds: { type: [String], required: true },
    username: {type: String, required: true, trim: true},
  });

  module.exports = mongoose.model('Lista', listaSchema)