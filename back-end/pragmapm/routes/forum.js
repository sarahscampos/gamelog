const express = require("express")
const router = express.Router()

let data = [
    {
        gameId: "0",
        comentarios:[
            {userId:"0", comentId:"0", coment: "Muito bom!"}
        ]
    }
];

router.post("/forum/:gameId/:userId", (request, response) =>{
    const game = data.find((game) => game.gameId === request.params.gameId);
    if(!game){
        return response.status(404).json({error: 'Página não encontrada'})
    }

    const novoComentario = request.body;
    if (!novoComentario) {
        return response.status(400).json({ error: 'Comentário não pode ser vazio' });
    }

    // Adicionando o novo comentário ao jogo
    game.comentarios.push(novoComentario);


    return response.status(201).json(game.comentarios)
})

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
    const newForum = {
        gameId,
        comentarios: [],
    };
    data.push(newForum);

    return response.status(201).json(newForum);
});

router.get("/forum/:gameId", (request, response) => {
    const game = data.find((game) => game.gameId === request.params.gameId)
    if(!game){
        return response.status(404).json({error: 'Jogo não encontrado'})
    }
    return response.status(200).json(game.comentarios)
  })

router.delete("/forum/:gameId/:userId/:comentId", (request, response) => {
    const game = data.find((game) => game.gameId === request.params.gameId)
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

return response.status(200).json(game.comentarios)
})

router.patch('/forum/:gameId/:userId/:comentId', (request, response) => {
    const game = data.find((game) => game.gameId === request.params.gameId)
    if(!game){
        return response.status(404).json({error: 'Página não encontrada'})
    }
    const comentario = game.comentarios.find((comentario) => comentario.comentId === request.params.comentId)
    if(!comentario){
        return response.status(404).json({error: 'Comentario não encontrada'})
    }
    if(comentario.userId != request.params.userId){
        return response.status(400).json({error: "Id de usuário inválido"})
    }

    const updatedComentario = request.body.coment
    if( updatedComentario){
        comentario.coment = updatedComentario;
    }

    return response.status(200).json(comentario);

})

module.exports = router