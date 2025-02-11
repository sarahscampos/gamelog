const mongoose = require('mongoose');

const perfilSchema = new mongoose.Schema({
  userId: {type: mongoose.Schema.Types.ObjectId, required: true, trim: true, unique: true},
  username: {type: String, required: true, trim: true, unique: true},
  nomePerfil: { type: String, required: true},
  avatar: { type: String , default: "https://play-lh.googleusercontent.com/5LIMaa7WTNy34bzdFhBETa2MRj7mFJZWb8gCn_uyxQkUvFx_uOFCeQjcK16c6WpBA3E"},
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