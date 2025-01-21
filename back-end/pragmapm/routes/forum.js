const express = require("express")
const server = express()

server.use(express.json())
server.listen(3004)

let data = [
    {
        gameId: "0",
        comentarios:[
            {userId:"0", comentId:"0", coment: "Muito bom!"}
        ]
    }
];

server.post("/forum/:gameId/:userId", (request, response) =>{
    const game = data.find((game) => game.gameId === request.params.gameId)
    if(!game){
        return response.status(404).json({error: 'Página não encontrada'})
    }
    const usuario = game.comentarios.find((usuario) => usuario.userId === request.params.userId)
    if(!usuario){
        return response.status(404).json({error: 'Usuário não encontrado'})
    }

    const novoComentario = request.body;
    if (!novoComentario) {
        return response.status(400).json({ error: 'Comentário não pode ser vazio' });
    }

    // Adicionando o novo comentário ao jogo
    game.comentarios.push(novoComentario);


    return response.status(201).json(game.comentarios)
})

server.get("/forum/:gameId", (request, response) => {
    const game = data.find((game) => game.gameId === request.params.gameId)
    if(!game){
        return response.status(404).json({error: 'Jogo não encontrado'})
    }
    return response.status(200).json(game.comentarios)
  })

server.delete("/forum/:gameId/:userId/:comentId", (request, response) => {
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

server.patch('/forum/:gameId/:userId/:comentId', (request, response) => {
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