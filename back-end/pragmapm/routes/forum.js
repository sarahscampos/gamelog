const express = require("express");
const server = express();

const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/");

server.use(express.json())
server.listen(3004)

const Forum = mongoose.model('Jogo', new mongoose.Schema({
    gameId: { type: String, required: true, unique: true },
    comentarios: [{
        userId: { type: String, required: true },
        comentId: { type: Number, required: true, unique:true},
        coment: { type: String, required: true, minlength:1, maxlength: 500 }
    }],
  }, { timestamps: true }));

server.post("/forum/:gameId/:userId", async(request, response) =>{
    try{
    const { gameId, userId} = request.params;
    const novoComentario = request.body;

    if (!novoComentario || !novoComentario.comentId || !novoComentario.coment) {
        return response.status(400).json({ error: "Dados incompletos para criar o comentário." });
      }

    const game = await Forum.findOne({gameId});
    if(!game){
        return response.status(404).json({error: 'Página não encontrada'})
    }
    const usuario = game.comentarios.find((usuario) => usuario.userId === request.params.userId)
    if(!usuario){
        return response.status(404).json({error: 'Usuário não encontrado'})
    }

    // Adicionando o novo comentário ao jogo
    game.comentarios.push(novoComentario);


    return response.status(201).json(game.comentarios)
} catch(err){
    return response.status(500).json({error: "Erro interno do servidor"});
}
})

server.get("/forum/:gameId", async (request, response) => {
    try{
    const { gameId } = request.params;
    const game = await Forum.findOne(gameId);

    if(!game){
        return response.status(404).json({error: 'Jogo não encontrado'})
    }

    return response.status(200).json(game.comentarios)

  } catch(err){
    return response.status(500).json({ error: "Erro interno do servidor." });
  }
});

server.delete("/forum/:gameId/:userId/:comentId", async (request, response) => {
    try{
    const { gameId, userId, comentId } = request.params;
    const game = await Forum.findOne({ gameId });

    if(!game){
        return response.status(404).json({error: 'Página não encontrada'})
    }
    const comentario = game.comentarios.find((comentario) => comentario.comentId === request.params.comentId)
    if(!comentario){
        return response.status(404).json({error: 'Comentario não encontrado'})
    }
    if(comentario.userId != request.params.userId){
        return response.status(400).json({error: "Id de usuário inválido"})
    }

    game.comentarios = game.comentarios.filter((comentario) => comentario.comentId !== request.params.comentId)
    await game.save();
    return response.status(200).json(game.comentarios);
} catch (err) {
    return response.status(500).json({ error: "Erro interno do servidor." });
  }
})

server.patch('/forum/:gameId/:userId/:comentId', async(request, response) => {
    try{
    const { gameId, userId, comentId } = request.params;
    const { coment } = request.body;

    if (!coment) {
        return response.status(400).json({ error: "Comentário não pode ser vazio." });
      }

      const game = await Forum.findOne({ gameId });

    if(!game){
        return response.status(404).json({error: 'Página não encontrada'})
    }
    const comentario = game.comentarios.find((comentario) => comentario.comentId === request.params.comentId)
    if(!comentario){
        return response.status(404).json({error: 'Comentario não encontrada'})
    }
    if(comentario.userId != userId){
        return response.status(403).json({error: "Permissão negada"})
    }

    comentario.coment = coment;
    await game.save();

    return response.status(200).json(comentario);
} catch (err) {
    return response.status(500).json({ error: "Erro interno do servidor." });
  }

})