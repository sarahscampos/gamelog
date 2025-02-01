const express = require('express');
const passport = require('passport')
const router = express.Router();
const Perfil = require('../models/Perfil');
const cors = require('./cors');


router.use(cors.corsWithOptions);
// pega todos os usuários
router.get('/perfil', async (request, response) => {
  try {
    const usuarios = await Perfil.find();
    response.json(usuarios);
  } catch (error) {
    response.status(500).json({ message: 'Erro ao obter usuários', error });
  }
});

// pega um único usuário
router.get('/perfil/:id', async (request, response) => {
  try {
    const usuario = await Perfil.findById(request.params.id);
    if (!usuario) return response.status(404).json({ message: 'Usuário não encontrado' });
    response.json(usuario);
  } catch (error) {
    response.status(500).json({ message: 'Erro ao obter usuário', error });
  }
});

// cria um usuário
router.post('/protected/perfil',
  passport.authenticate("jwt", { session: false }),
  async (request, response) => {
  try {
    const novoUsuario = new Perfil(request.body);  // Criando uma instância do modelo Perfil
    await novoUsuario.save();
    response.status(201).json(novoUsuario);
  } catch (error) {
    response.status(500).json({ message: 'Erro ao criar usuário', error });
  }
});

// atualiza um usuário
router.put('/perfil/:id', async (request, response) => {
  try {
    const usuario = await Perfil.findByIdAndUpdate(request.params.id, request.body, { new: true });
    if (!usuario) return response.status(404).json({ message: 'Usuário não encontrado' });
    response.json(usuario);
  } catch (error) {
    response.status(500).json({ message: 'Erro ao atualizar usuário', error });
  }
});

// deleta um usuário
router.delete('/protected/perfil/:id',
  passport.authenticate("jwt", { session: false }),
  async (request, response) => {
  try {
    const usuario = await Perfil.findByIdAndDelete(request.params.id);
    if (!usuario) return response.status(404).json({ message: 'Usuário não encontrado' });
    response.json(usuario);
  } catch (error) {
    response.status(500).json({ message: 'Erro ao deletar usuário', error });
  }
});

module.exports = router;