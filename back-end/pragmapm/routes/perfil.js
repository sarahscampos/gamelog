const express = require('express');
const passport = require('passport')
const router = express.Router();
const Perfil = require('../models/Perfil');
const cors = require('./cors');

router.use(cors.corsWithOptions);
// pega todos os perfis
router.get('/perfil', async (request, response) => {
  try {
    const perfis = await Perfil.find();
    response.json(perfis);
  } catch (error) {
    console.log(error)
    response.status(500).json({ message: 'Erro ao obter todos os perfis', error });
  }
});

// pega um único perfil com id 
/*router.get('/perfil/:id', async (request, response) => { // não pode existir essas duas rotas nao da pra diferenciar
  try {
    const perfil = await Perfil.findById(request.params.id);
    if (!perfil) return response.status(404).json({ message: 'Perfil não encontrado' });
    response.json(perfil);
  } catch (error) {
    console.log(error);
    response.status(500).json({ message: 'Erro ao obter perfil', error });
  }
});*/


// pega um único perfil com username
router.get('/perfil/:username', async (request, response) => {
  try {
    const perfil = await Perfil.findOne({username: request.params.username});
    if (!perfil) return response.status(404).json({ message: 'Perfil não encontrado' });
    response.json(perfil);
  } catch (error) {
    console.log(error);
    response.status(500).json({ message: 'Erro ao obter perfil', error });
  }
});


// cria um perfil
router.post('/perfil', //protected
  //passport.authenticate("jwt", { session: false }),
  async (request, response) => {
  try {
    const novoPerfil = new Perfil(request.body);  // Criando uma instância do modelo Perfil
    await novoPerfil.save();
    response.status(201).json(novoPerfil);
  } catch (error) {
    console.log(error);
    response.status(500).json({ message: 'Erro ao criar perfil', error });
  }
});

// atualiza o perfil
router.put('/perfil/:username', async (request, response) => {
  try {
    const perfil = await Perfil.findOneAndUpdate(
      { username: request.params.username }, 
      request.body, 
      { new: true }
    );

    if (!perfil) return response.status(404).json({ message: 'Perfil não encontrado' });
    response.json(perfil);
  } catch (error) {
    console.log(error);
    response.status(500).json({ message: 'Erro ao atualizar perfil', error });
  }
});

// deleta um perfil
router.delete('/perfil/:username', // protected
  passport.authenticate("jwt", { session: false }),
  async (request, response) => {
    try {
      const perfil = await Perfil.findOneAndDelete({ username: request.params.username });
      if (!perfil) return response.status(404).json({ message: 'Perfil não encontrado' });
      response.json({ message: 'Perfil deletado com sucesso' });
    } catch (error) {
      console.log(error);
      response.status(500).json({ message: 'Erro ao deletar perfil', error });
    }
  }
);

// deleta todos perfis
router.delete('/perfil', async (req, res) => {
  try {
    const result = await Perfil.deleteMany({});  // Deletes all documents in the collection
    res.json({ message: `${result.deletedCount} perfil(s) deletado(s) com sucesso` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao deletar os perfis', error });
  }
});

module.exports = router;