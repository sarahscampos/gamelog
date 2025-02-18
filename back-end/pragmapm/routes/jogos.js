var express = require('express');
var router = express.Router();
const Jogo = require('../models/Jogo');
const cors = require('./cors');

router.use(cors.corsWithOptions);

router.post("/jogos", async (request, response) => {
  const { nome, colocacao, capa, desenvolvedora, dataLancamento, distribuidora, generos, sumario } = request.body;

  // Criar o novo jogo e salvar no MongoDB
  const novoJogo = new Jogo({ nome, colocacao, capa, desenvolvedora, dataLancamento, distribuidora, generos, sumario });
  
  try {
    await novoJogo.save();
    return response.status(201).json({ message: "Novo jogo adicionado", jogo: novoJogo });
  } catch (err) {
    return response.status(500).json({ error: "Erro ao salvar o jogo", details: err });
  }
});

// Rota GET para listar os jogos
router.get("/jogos", async (request, response) => {
  try {
    const jogos = await Jogo.find();
    return response.json(jogos);
  } catch (err) {
    return response.status(500).json({ error: "Erro ao buscar jogos", details: err });
  }
});

router.delete("/jogo/:id", async (req, res) => {
  try {
      const jogo = await Jogo.findByIdAndDelete(req.params.id);
      if (!jogo) return res.status(404).json({ message: 'Jogo não encontrado' });
      res.json(jogo);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao deletar jogo', error });
    }
})

router.get('/jogo/:id', async (request, response) => {
  try {
    const jogo = await Jogo.findById(request.params.id);
    if (!jogo) return response.status(404).json({ message: 'Jogo não encontrado' });
    response.json(jogo);
  } catch (error) {
    response.status(500).json({ message: 'Erro ao obter jogo', error });
  }
});

module.exports = router;