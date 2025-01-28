var express = require('express');
var router = express.Router();
const Jogo = require('../models/Jogo');


router.post("/jogos", async (request, response) => {
  const { id, nome, colocacao, capa, desenvolvedora, dataLancamento, distribuidora, generos, sumario } = request.body;

  // Validação dos campos obrigatórios
  if (!id || !nome || !colocacao || !capa || !desenvolvedora || !dataLancamento || !distribuidora || !generos || !sumario) {
    return response.status(400).json({ error: "Todos os campos são obrigatórios" });
  }
  // Verificar se o jogo já existe
  const jogoJaExiste = await Jogo.findOne({ id });
  if (jogoJaExiste) {
    return response.status(409).json({ error: "Já existe um jogo com esse id" });
  }

  // Criar o novo jogo e salvar no MongoDB
  const novoJogo = new Jogo({ id, nome, colocacao, capa, desenvolvedora, dataLancamento, distribuidora, generos, sumario });
  
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

module.exports = router