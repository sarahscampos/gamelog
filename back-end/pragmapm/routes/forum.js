const express = require("express");
const passport = require("passport");
const Forum = require("../models/ForumSchema");

const router = express.Router();
const cors = require('./cors');

router.use(cors.corsWithOptions);

// Rota POST - Adicionar Comentário
router.post("/protected/forum/:gameId", 
    passport.authenticate("jwt", { session: false }),
    async (request, response) => {
      try {
        const { gameId } = request.params;
        const { coment, userId } = request.body; // Obtém os dados do corpo da requisição
  
        // Verifica campos obrigatórios
        if (!coment || !userId || coment.trim() === '') {
          return response.status(400).json({ error: "Comentário ou usuário não informado corretamente." });
        }
  
        // Busca o jogo no banco
        const game = await Forum.findOne({ gameId });
        if (!game) {
          return response.status(404).json({ error: "Jogo não encontrado." });
        }
  
        // Formata e adiciona o novo comentário
        const novoComentario = {
          coment,
          userId,
          data: new Date(), // Adiciona a data do comentário
        };
        game.comentarios.push(novoComentario);
  
        // Salva as alterações no banco
        await game.save();
  
        return response.status(201).json(game.comentarios); // Retorna os comentários atualizados
      } catch (err) {
        console.error(err);
        return response.status(500).json({ error: "Erro interno do servidor." });
      }
    }
  );
  

//Rota POST - Adiciona novo Forum
router.post("/forum", 
    passport.authenticate("jwt", { session: false }),
    async (request, response) => {
    try{
    const { gameId } = request.body;

    // Verifica se o gameId foi enviado
    if (!gameId) {
        return response.status(400).json({ error: "gameId é obrigatório" });
    }

    // Verifica se o gameId já existe
    const existingGame = await Forum.findOne({gameId});
    if (existingGame) {
        return response.status(400).json({ error: "gameId já existe" });
    }

    // Cria um novo fórum/jogo
    const newGame = new Forum({
        gameId,
        comentarios: [],
    });
    
    await newGame.save();

    return response.status(201).json(newGame);
} catch(err){
    return response.status(500).json({error: "Erro interno do servidor"});
}
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

router.get("/forum", async (request, response) => {
    try {
      const forums = await Forum.find();
      response.json(forums);
    } catch (err) {
      return response.status(500).json({ error: "Erro interno do servidor." });
    }
  });

// Rota DELETE - Remover Comentário
router.delete("/forum/:gameId/:userId/:comentId", 
    passport.authenticate("jwt", { session: false }),
    async (request, response) => {
  try {
    const { gameId, userId, comentId } = request.params;
    const game = await Forum.findOne({ gameId });


    if (!game) {
      return response.status(404).json({ error: "Jogo não encontrado." });
    }

    const comentario = game.comentarios.find((comentario) => comentario._id.toString() === comentId);
    if (!comentario) {
      return response.status(404).json({ error: "Comentário não encontrado." });
    }

    if (comentario.userId !== userId) {
      return response.status(403).json({ error: "Permissão negada." });
    }

    // Removendo o comentário
    game.comentarios = game.comentarios.filter((comentario) => comentario._id.toString() !== comentId);
    await game.save();

    return response.status(200).json({ message: "Comentário removido com sucesso.", comentarios: game.comentarios });
  } catch (err) {
    return response.status(500).json({ error: "Erro interno do servidor." });
  }
});

// Rota PATCH - Atualizar Comentário
router.patch("/forum/:gameId/:userId/:comentId",
    passport.authenticate("jwt", { session: false }),
    async (request, response) => {
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

    const comentario = game.comentarios.find((comentario) => comentario._id.toString() === comentId);
    if (!comentario) {
      return response.status(404).json({ error: "Comentário não encontrado." });
    }

    if (comentario.userId.toString() !== userId) {
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