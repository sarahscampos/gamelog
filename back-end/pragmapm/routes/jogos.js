var express = require('express');
var server = express();

const jogos = []

server.listen(3004)
server.use(express.json())

server.post("/jogos", (request, response) => {

  const {id, nome, colocacao, capa, desenvolvedora, dataLancamento, distribuidora, generos, sumario} = request.body

  if (!id || !nome || !colocacao || !capa || !desenvolvedora || !dataLancamento || !distribuidora || !generos || !sumario) {
    return response.status(400).json({ error: "Todos os campos são obrigatórios" });
  }

  const jogoJaExiste = jogos.find(jogo => jogo.id === id);
  if (jogoJaExiste) {
    return response.status(409).json({ error: "Já existe um jogo com esse id" });
  }

  const novoJogo = {id, nome, colocacao, capa, dataLancamento, desenvolvedora, distribuidora, generos, sumario}; //novo jogo é um objeto
  jogos.push(novoJogo);

  return response.status(201).json({ message: "Novo jogo adicionado", jogo: novoJogo });
})

server.get("/jogos", (request, response) => {
  console.log(request)
  return response.json(jogos)
})

/* GET users listing. */
/*router.get('/', function(req, res, next) {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.json();
})*/

//module.exports = router;
