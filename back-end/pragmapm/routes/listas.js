const express = require('express');
const bodyParser = require('body-parser');
const cors = require('./cors');
const Lista = require('../models/Lista');

const router = express.Router();
router.use(cors.corsWithOptions);
router.use(bodyParser.json());

// GET /listas/:userId
router.get('/listas/:username', async (req, res) => {
  try {
    const listas = await Lista.find({ username: req.params.username });
    if (!listas.length) {
      return res.status(404).json({ error: 'Usuário não encontrado ou sem listas' });
    }
    res.status(200).json(listas);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar listas' });
  }
});

// POST /listas/:userId
router.post('/listas/:username', async (req, res) => {
  try {
    const novaLista = new Lista({ ...req.body, userId: req.params.userId });
    await novaLista.save();
    res.status(201).json(novaLista);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao criar lista' });
  }
});

// PATCH /listas/:userId/:idLista
router.patch('/listas/:username/:idLista', async (req, res) => {
  try {
    const { idJogo } = req.body;
    const lista = await Lista.findOneAndUpdate(
      { _id: req.params.idLista, userId: req.params.userId },
      { $addToSet: { ids: idJogo } },
      { new: true }
    );
    if (!lista) return res.status(404).json({ error: 'Lista não encontrada' });
    res.status(200).json(lista);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao atualizar lista' });
  }
});

// PATCH /listas/:userId/:idLista/remove
router.patch('/listas/:username/:idLista/remove', async (req, res) => {
  try {
    const { idJogo } = req.body;
    const lista = await Lista.findOneAndUpdate(
      { _id: req.params.idLista, userId: req.params.userId },
      { $pull: { ids: idJogo } },
      { new: true }
    );
    if (!lista) return res.status(404).json({ error: 'Lista não encontrada' });
    res.status(200).json(lista);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao remover jogo da lista' });
  }
});

// DELETE /listas/:userId/:idLista
router.delete('/listas/:username/:idLista', async (req, res) => {
  try {
    const lista = await Lista.findOneAndDelete({ _id: req.params.idLista, userId: req.params.userId });
    if (!lista) return res.status(404).json({ error: 'Lista não encontrada' });
    res.status(200).json({ message: 'Lista removida com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar lista' });
  }
});

// PATCH /listas/:username/:idLista
router.post('/listas/:username/:idLista', async (req, res) => {
  try {
    const { idJogo } = req.body;

    // Encontra a lista e adiciona o jogo ao array `ids` (ou outro campo designado para os jogos)
    const lista = await Lista.findOneAndUpdate(
      { _id: req.params.idLista, username: req.params.username }, // Verifica a lista pelo ID e pelo username
      { $addToSet: { jogosIds: idJogo } }, // Adiciona o `idJogo` ao array, evitando duplicados
      { new: true } // Retorna a lista atualizada
    );

    // Verifica se a lista foi encontrada
    if (!lista) {
      return res.status(404).json({ error: 'Lista não encontrada para este usuário' });
    }

    res.status(200).json(lista); // Retorna a lista atualizada
  } catch (error) {
    res.status(400).json({ error: 'Erro ao adicionar jogo à lista' });
  }
});


module.exports = router;
