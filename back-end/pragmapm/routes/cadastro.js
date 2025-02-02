const express = require('express');
const User = require('../models/User');
const router = express.Router();
const cors = require('./cors');

router.use(cors.corsWithOptions);

router.post('/cadastro', async (req, res) => {
    try {
      const { email, password } = req.body;
      const novoUsuario = new User({ email, password });
  
      await novoUsuario.save();
      res.status(201).json({ message: 'Usuário cadastrado com sucesso!' });
    } catch (error) {
      res.status(500).json({ message: 'Erro ao cadastrar usuário', error });
    }
  });
  

module.exports = router;