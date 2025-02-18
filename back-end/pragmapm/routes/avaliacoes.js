var express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
var router = express.Router();
const Avaliacao = require('../models/Avaliacao');
const Perfil = require('../models/Perfil');
const cors = require('./cors');
const Jogo = require('../models/Jogo');

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
      const jogo = await Jogo.findById(newAvaliacao.idJogo);
      const newMedia = ((perfil.analises * perfil.media) + request.body.score) / (perfil.analises + 1);
      const newCount = perfil.analises + 1;
      const newMediaJogo = ((jogo.analises * jogo.notaMedia) + request.body.score) / (jogo.analises + 1);
      const newCountJogo = jogo.analises + 1;
      
      perfil.media = newMedia;
      perfil.analises = newCount;
      jogo.notaMedia = newMediaJogo;
      jogo.analises = newCountJogo;

      await perfil.save().catch(console.error);
      await avaliacao.save().catch(console.error);
      await jogo.save().catch(console.error);

      const jogosOrdenados = await Jogo.find().sort({ notaMedia: -1 });

      for (let i = 0; i < jogosOrdenados.length; i++) {
        jogosOrdenados[i].colocacao = i + 1; // Atualiza a colocação com base na posição
        await jogosOrdenados[i].save();
      }

      return response.status(204).json(avaliacao);

      

    } catch (err) {
      return response
        .status(500)
        .json({ error: "Erro ao publicar avaliação", details: err });
    }
  }
);

//Deleta uma avaliação
router.delete(
  "/protected/avaliacoes/:gameId/:userId/:avaliacaoId",
  passport.authenticate("jwt", { session: false }),
  async (request, response) => {
    try {
      const { gameId, userId, avaliacaoId } = request.params;

      const avaliacao = await Avaliacao.findById(avaliacaoId);

      // Atualizar o jogo, removendo uma análise e ajustando a média
      const jogo = await Jogo.findById(gameId);
      if (jogo) {
        jogo.analises = Math.max(0, jogo.analises - 1);
        if (jogo.analises === 0) {
          jogo.notaMedia = 0;
        } else {
          jogo.notaMedia = (jogo.notaMedia * (jogo.analises + 1) - avaliacao.score) / jogo.analises;
        }
        await jogo.save();
      }

      // Atualizar perfil do usuário
      const perfil = await Perfil.findOne({ username: userId });
      if (perfil) {
        perfil.analises = Math.max(0, perfil.analises - 1);
        if (perfil.analises === 0) {
          perfil.media = 0;
        } else {
          perfil.media = (perfil.media * (perfil.analises + 1) - avaliacao.score) / perfil.analises;
        }
        await perfil.save();
      }

      // Deletar avaliação
      await Avaliacao.findByIdAndDelete(avaliacaoId);

      return response.status(200).json({ message: "Avaliação deletada com sucesso" });

    } catch (err) {
      return response.status(500).json({ error: "Erro ao deletar avaliação", details: err.message });
    }
  }
);


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



module.exports = router;