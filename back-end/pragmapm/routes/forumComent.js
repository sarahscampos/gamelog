const express = require("express");
const passport = require("passport");
const ForumComentSchema = require("../models/ForumComentSchema");
const Jogo = require("../models/Jogo");

const router = express.Router();
const cors = require('./cors');

router.use(cors.corsWithOptions);

// Rota POST - Adicionar Comentário
router.post("/forum/:gameId", 
    //passport.authenticate("jwt", { session: false }),
    async (request, response) => {
      try {
        const { gameId } = request.params;
        const { coment, username } = request.body; // Obtém os dados do corpo da requisição
  
        // Verifica campos obrigatórios
        if (!coment || !username || coment.trim() === '') {
          return response.status(400).json({ error: "Comentário ou usuário não informado corretamente." });
        }

        const jogoExiste = await Jogo.findById(gameId);
        if (!jogoExiste) {
          return response.status(404).json({ error: "Jogo não encontrado." });
        }
  
        // Busca o jogo no banco
        const novoComentario = new ForumComentSchema({gameId, username, coment});
  
        // Salva novo comentario
        await novoComentario.save();
  
        return response.status(201).json(novoComentario);
      } catch (err) {
        console.error(err);
        return response.status(500).json({ error: "Erro interno do servidor." });
      }
    }
  );
  
// Rota GET - Obter Comentários
router.get("/forum/:gameId", async (request, response) => {
  try {
    const { gameId } = request.params;
    const comentarios = await ForumComentSchema.find({ gameId });

    if (comentarios.length === 0) {
      return response.status(404).json({ error: "Jogo não encontrado." });
    }
    return response.status(200).json(comentarios);
    
  } catch (err) {
    return response.status(500).json({ error: "Erro interno do servidor." });
  }
});

// pra ver os foruns diferentes
router.get("/forum", async (request, response) => {
    try {
      const forums = await ForumComentSchema.distinct("gameId");
      response.json(forums);
    } catch (err) {
      return response.status(500).json({ error: "Erro interno do servidor." });
    }
  });

// Rota DELETE - Remover Comentário
router.delete("/forum/:gameId/:comentId",
  //passport.authenticate("jwt", { session: false }),
  async (request, response) => {
try {
  const { gameId, comentId } = request.params;

  const comentario = await ForumComentSchema.findOneAndDelete({
    gameId: gameId,
    _id: comentId
  });

  if (!comentario) {
    return response.status(404).json({ error: "Comentário não encontrado." });
  }

  return response.status(200).json({message: "Comentario deletado com sucesso!"});
} catch (err) {
  return response.status(500).json({ error: "Erro interno do servidor." });
}
});

// Rota PATCH - Atualizar Comentário
router.patch("/forum/:gameId/:comentId",
    //passport.authenticate("jwt", { session: false }),
    async (request, response) => {
  try {
    const { gameId, comentId } = request.params;
    const { newComent } = request.body;

    if (!newComent || newComent.trim() === '') {
      return response.status(400).json({ error: "Comentário não pode ser vazio." });
    }

    const comentarios = await ForumComentSchema.find({gameId: gameId});
    
    const comentario = comentarios.find(c => c._id.toString() === comentId);

    if (!comentario) {
      return response.status(404).json({ error: "Comentário não encontrado." });
    }
    /*
    if (comentario.username !== request.user.username) {
      return response.status(403).json({ error: "Permissão negada." });
    }
    */

    // Atualizando o comentário
    comentario.coment = newComent;
    await comentario.save();

    return response.status(200).json(comentario);
  } catch (err) {
    return response.status(500).json({ error: "Erro interno do servidor." });
  }
});

module.exports = router;