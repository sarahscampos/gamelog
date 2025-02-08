const express = require('express');
const User = require('../models/User');
const Perfil = require('../models/Perfil');
const router = express.Router();
const cors = require('./cors');

router.use(cors.corsWithOptions);

router.post('/cadastro', async (req, res) => {
  const {nome, email, password } = req.body;
    try {

      if(!nome || !email ||!password) {
        return res.status(400).json({message: 'Todos os campos obrigatórios'})
      }
      const novoUsuario = new User({ nome, email, password });

      const userExists = await User.findOne({ email });
      if(userExists) {
        return res.status(400).json({ message: 'Este email já está em uso'});
      }
      const idDoUsuario = novoUsuario._id
      const nomeUsuario = novoUsuario.nome

      const novoPerfil = new Perfil({userId:idDoUsuario, username:nomeUsuario, nomePerfil:nomeUsuario})
      await novoPerfil.save();
  
      await novoUsuario.save();
      res.status(201).json({ message: 'Usuário cadastrado com sucesso!' });
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: 'Erro ao cadastrar usuário', error });
    }
  });
  
router.get('/cadastro', async (req, res) => {
  try {
    const perfis = await User.find();
    res.json(perfis);
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Erro ao obter todos os perfis', error });
  }
});

module.exports = router;