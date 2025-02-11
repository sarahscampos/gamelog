const express = require('express');
const User = require('../models/User');
const Perfil = require('../models/Perfil');
const router = express.Router();
const cors = require('./cors');
const Lista = require('../models/Lista');

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

      const novaLista = new Lista({nome: 'Favoritos', jogosIds: [], username: nomeUsuario});
      const novoPerfil = new Perfil({userId: idDoUsuario, username: nomeUsuario, nomePerfil: nomeUsuario})
      
      await novoPerfil.save();

      await novaLista.save();
      
      await novoUsuario.save();
      
      res.status(201).json({ message: 'Usuário cadastrado com sucesso!' });
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: 'Erro ao cadastrar usuário', error });
    }
  });
  
router.get('/cadastro', async (req, res) => {
  try {
    const cadastros = await User.find();
    res.json(cadastros);
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Erro ao obter todos os cadastros', error });
  }
});

router.get('/cadastro/:id', async (req, res) => {
  try {
    const cadastro = await User.findById(id);
    res.json(cadastro);
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Erro ao obter o cadastro', error });
  }
});

router.delete('/cadastro/:id', async (req, res) => {
  try {
    const cadastro = await User.findByIdAndDelete(req.params.id);
    if (!cadastro) return res.status(404).json({ message: 'Cadastro não encontrado' });
    res.json({ message: 'Cadastro deletado com sucesso' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao deletar o cadastro', error });
  }
});

router.delete('/cadastro', async (req, res) => {
  try {
    const result = await User.deleteMany({});  // Deletes all documents in the collection
    res.json({ message: `${result.deletedCount} cadastro(s) deletado(s) com sucesso` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao deletar os cadastros', error });
  }
});

module.exports = router;