const express = require("express");
const passport = require("passport");
const Forum = require("../models/ForumSchema");

const router = express.Router();

// Rota POST - Adicionar Comentário
router.post("/protected/forum/:gameId/:userId", 
    passport.authenticate("teste", { session: false }),
    async (request, response) => {
  try {
    const { gameId, userId } = request.params;
    const novoComentario = request.body;

    if (!novoComentario || !novoComentario.comentId || !novoComentario.coment || !novoComentario.data) {
      return response.status(400).json({ error: "Dados incompletos para criar o comentário." });
    }

    const game = await Forum.findOne({ gameId });
    if (!game) {
      return response.status(404).json({ error: "Jogo não encontrado." });
    }

    const usuario = game.comentarios.find((usuario) => usuario.userId === userId);
    if (!usuario) {
      return response.status(404).json({ error: "Usuário não encontrado." });
    }

    // Adicionando o novo comentário
    game.comentarios.push(novoComentario);
    await game.save();

    return response.status(201).json(game.comentarios);
  } catch (err) {
    return response.status(500).json({ error: "Erro interno do servidor." });
  }
});

//Rota POST - Adiciona novo Forum
router.post("/forum", (request, response) => {
    const { gameId } = request.body;

    // Verifica se o gameId foi enviado
    if (!gameId) {
        return response.status(400).json({ error: "gameId é obrigatório" });
    }

    // Verifica se o gameId já existe
    const existingGame = data.find((game) => game.gameId === gameId);
    if (existingGame) {
        return response.status(400).json({ error: "gameId já existe" });
    }

    // Cria um novo fórum/jogo
    const newGame = {
        gameId,
        comentarios: [],
    };
    data.push(newGame);

    return response.status(201).json(newGame);
});

// Rota GET - Obter Comentários
router.get("/forum/:gameId", async (request, response) => {
  try {
    const { gameId } = request.params;
    const game = await Forum.findOne({ gameId });

    if (!game) {
      return response.status(404).json({ error: "Jogo não encontrado." });
    }

    return response.status(200).json(game.comentarios);
  } catch (err) {
    return response.status(500).json({ error: "Erro interno do servidor." });
  }
});

// Rota DELETE - Remover Comentário
router.delete("/forum/:gameId/:userId/:comentId", async (request, response) => {
  try {
    const { gameId, userId, comentId } = request.params;
    const game = await Forum.findOne({ gameId });

    if (!game) {
      return response.status(404).json({ error: "Jogo não encontrado." });
    }

    const comentario = game.comentarios.find((comentario) => comentario.comentId.toString() === comentId);
    if (!comentario) {
      return response.status(404).json({ error: "Comentário não encontrado." });
    }

    if (comentario.userId !== userId) {
      return response.status(403).json({ error: "Permissão negada." });
    }

    // Removendo o comentário
    game.comentarios = game.comentarios.filter((comentario) => comentario.comentId.toString() !== comentId);
    await game.save();

    return response.status(200).json({ message: "Comentário removido com sucesso.", comentarios: game.comentarios });
  } catch (err) {
    return response.status(500).json({ error: "Erro interno do servidor." });
  }
});

// Rota PATCH - Atualizar Comentário
router.patch("/forum/:gameId/:userId/:comentId", async (request, response) => {
  try {
    const { gameId, userId, comentId } = request.params;
    const { coment } = request.body;

    if (!coment) {
      return response.status(400).json({ error: "Comentário não pode ser vazio." });
    }

    const game = await Forum.findOne({ gameId });

    if (!game) {
      return response.status(404).json({ error: "Jogo não encontrado." });
    }

    const comentario = game.comentarios.find((comentario) => comentario.comentId.toString() === comentId);
    if (!comentario) {
      return response.status(404).json({ error: "Comentário não encontrado." });
    }

    if (comentario.userId !== userId) {
      return response.status(403).json({ error: "Permissão negada." });
    }

    // Atualizando o comentário
    comentario.coment = coment;
    await game.save();

    return response.status(200).json(comentario);
  } catch (err) {
    return response.status(500).json({ error: "Erro interno do servidor." });
  }
});

module.exports = router;