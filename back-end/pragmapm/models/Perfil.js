const mongoose = require('mongoose');

const perfilSchema = new mongoose.Schema({
  username: {type: String, required: true, trim: true, unique: true}, // CHAVE ESTRANGEIRA PRO NOME DO USUARIO
  nomePerfil: { type: String, required: true },
  avatar: { type: String, required: true },
  descricao: { type: String },
  analises: { type: Number, default: 0 },
  media: { type: Number, default: 0 },
  amigos: { type: Number, default: 0 },
  localizacao: { type: String },
  membroDesde: { type: Date },
  jogosAdicionados: { type: Number, default: 0 },
  completos: { type: Number, default: 0 },
  jogando: { type: Number, default: 0 },
  desejados: { type: Number, default: 0 },
  listasFixadasIds: [{ type: Number }]
});

module.exports = mongoose.model('Perfil', perfilSchema);