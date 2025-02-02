const express = require('express');
const bodyParser = require('body-parser');
const cors = require('./cors');
const Lista = require('../models/Lista');

const router = express.Router();
router.use(cors.corsWithOptions);
router.use(bodyParser.json());

// GET /listas/:userId
router.get('/listas/:userId', async (req, res) => {
  try {
    const listas = await Lista.find({ userId: req.params.userId });
    if (!listas.length) {
      return res.status(404).json({ error: 'Usuário não encontrado ou sem listas' });
    }
    res.status(200).json(listas);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar listas' });
  }
});

// POST /listas/:userId
router.post('/listas/:userId', async (req, res) => {
  try {
    const novaLista = new Lista({ ...req.body, userId: req.params.userId });
    await novaLista.save();
    res.status(201).json(novaLista);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao criar lista' });
  }
});

// PATCH /listas/:userId/:idLista
router.patch('/listas/:userId/:idLista', async (req, res) => {
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
router.patch('/listas/:userId/:idLista/remove', async (req, res) => {
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
router.delete('/listas/:userId/:idLista', async (req, res) => {
  try {
    const lista = await Lista.findOneAndDelete({ _id: req.params.idLista, userId: req.params.userId });
    if (!lista) return res.status(404).json({ error: 'Lista não encontrada' });
    res.status(200).json({ message: 'Lista removida com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar lista' });
  }
});

module.exports = router;
