const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const usuarioSchema = new mongoose.Schema({

  nome: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },

  email: {
    type: String,
    required: true,
    unique: true, // Garante que não haverá dois usuários com o mesmo login
    trim: true,   // Remove espaços extras no início e fim
    minlength: 4, // Login deve ter pelo menos 4 caracteres
  },
  password: {
    type: String,
    required: true,
    minlength: 6, // Exige que a senha tenha pelo menos 6 caracteres
  }
});

// Middleware para hash da senha antes de salvar
usuarioSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(10); // Gera um salt
    this.password = await bcrypt.hash(this.password, salt); // Faz o hash da senha
  }
  next();
});

// Método para validar a senha
usuarioSchema.methods.isValidPassword = async function (password) {
  return bcrypt.compare(password, this.password); // Compara senha fornecida com o hash armazenado
};

module.exports = mongoose.model('User', usuarioSchema);
