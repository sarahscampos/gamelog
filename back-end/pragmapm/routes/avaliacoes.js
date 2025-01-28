var express = require('express');
const passport = require('passport');
var router = express.Router();
const Avaliacao = require('../models/Avaliacao');

//Pega lista de avaliações de um jogo
router.get("/avaliacoes/:gameId", async (request, response) => {
  try{
  const { gameId } = request.params;
  const game = await Avaliacao.findOne( {gameId} );
  if(!game){
      return response.status(404).json({error: 'Jogo não encontrado'})
  }

  return response.status(200).json(game.avaliacoes)

} catch(err){
  return response.status(500).json({ error: "Erro ao acessar avaliações", details: err });
}
});

//Publica nova avaliação
router.post(
  "/protected/avaliacoes/:gameId/:userId",
  passport.authenticate("jwt", { session: false }), // Middleware para proteger a rota
  async (request, response) => {
    try {
      const { gameId, userId } = request.params;
      const newAvaliacao = request.body;

      // Verifica campos obrigatórios
      if (!newAvaliacao.score || !newAvaliacao.avaliacaoId) {
        return response
          .status(400)
          .json({ error: "Dados incompletos para criar o Avaliação." });
      }

      // Busca o jogo pelo ID
      const game = await Avaliacao.findOne({ gameId });
      if (!game) {
        return response.status(404).json({ error: "Página não encontrada" });
      }

      // Verifica se o usuário existe nas avaliações do jogo
      const usuario = game.avaliacoes.find(
        (usuario) => usuario.userId === userId
      );
      if (!usuario) {
        return response.status(404).json("Usuário não pode ser encontrado");
      }

      // Adiciona a nova avaliação ao array de avaliações do jogo
      game.avaliacoes.push(newAvaliacao);
      await game.save(); // Salva as alterações no banco de dados

      return response.status(201).json(game.avaliacoes);
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
    aval = newAval;
    await game.save();

    return response.status(200).json(aval)

  } catch(err){
    return response.status(500).json({ error: "Erro ao atualizar avaliação", details: err })
  }
})



module.exports = router;