var express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
var router = express.Router();
const Avaliacao = require('../models/Avaliacao');
const Perfil = require('../models/Perfil');
const cors = require('./cors');

router.use(cors.corsWithOptions); 
//Pega lista de avaliações de um jogo
router.get("/avaliacoes/:idJogo", async (request, response) => {
try{
  const { idJogo } = request.params;
  const avaliacoes = await Avaliacao.find( {idJogo} );

  return response.status(200).json(avaliacoes)

} catch(err){
  return response.status(500).json({ error: "Erro ao acessar avaliações", details: err });
}
});

//Publica nova avaliação
router.post(
  "/protected/avaliacoes",
  passport.authenticate("jwt", { session: false }), // Middleware para proteger a rota
  async (request, response) => {
    try {
      const newAvaliacao = {
        username: request.body.username, 
        comment: request.body.comment, 
        score: request.body.score, 
        idJogo: new mongoose.Types.ObjectId(request.body.idJogo)
      }
      const avaliacao = new Avaliacao(newAvaliacao);
      const perfil = await Perfil.findOne({username: request.body.username});
      const newMedia = ((perfil.analises * perfil.media) + request.body.score) / (perfil.analises + 1);
      const newCount = perfil.analises + 1;
      perfil.media = newMedia;
      perfil.analises = newCount;
      await perfil.save().catch(console.error);
      await avaliacao.save().catch(console.error);

      return response.status(204).json(avaliacao);

    } catch (err) {
      return response
        .status(500)
        .json({ error: "Erro ao publicar avaliação", details: err });
    }
  }
);

//Deleta uma avaliação
router.delete("/avaliacoes/:gameId/:userId/:avaliacaoId", async (request, response) =>{
  try{
    const { gameId, userId, avaliacaoId} = request.params;
    const game = await Avaliacao.findOne({ gameId });

    if(!game){
      return response.status(404).json({error: "Página não encontrada"})
    }

    //Procura avaliação a ser deletada
    const index = game.avaliacoes.findIndex((aval) => aval.avaliacaoId === request.params.avaliacaoId)
    if(index == -1){
      return response.status(404).json({error: "Avaliação não pode ser encontrada"})
    }

    const delAvaliacao = game.avaliacoes[index];

    //Checa id do usuário e avaliação
    if(delAvaliacao.userId != request.params.userId){
      return response.status(400).json({error: "Usuário inválido"})
    }

    //Deleta avaliação do banco
    game.avaliacoes.splice(index, 1);
    return response.status(200).json(game.avaliacoes);

  } catch(err){
      return response.status(500).json({ error: "Erro ao deletar avaliação", details: err })
  }
})

router.patch("/avaliacoes/:gameId/:userId/:avaliacaoId", async(request, response) =>{
  try{
    const {gameId, userId, avaliacaoId} = request.params;
    const newAval = request.body;

    //Checa campos obrigatórios
    if(!newAval.score || !newAval.avaliacaoId){
      return response.status(400).json({error: "Campos obrigatórios inválidos"})
    }

    const game = await Avaliacao.findOne({ gameId });
    if(!game){
      return response.status(404).json({error: "Página não encontrada"})
    }

    //Procura a avaliação
    const aval = game.avaliacoes.find((aval) => aval.avaliacaoId === request.params.avaliacaoId);
    if(!aval){
      return response.status(400).json({error: "Avaliação não encontrada"})
    }

    //Verifica usuário
    if(aval.userId != request.params.userId){
      return response.status(400).json({error: "Usuário inválido"})
    }

    //Substitui avaliação antiga por nova
    aval.score = newAval.score;
    aval.coment = newAval.coment;
    await game.save();

    return response.status(200).json(aval)

  } catch(err){
    return response.status(500).json({ error: "Erro ao atualizar avaliação", details: err })
  }
})



module.exports = router;