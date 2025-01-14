var express = require('express');
var server = express();

const jogos = []

server.listen(3004)
server.use(express.json())

server.post("/jogos", (request, response) => {

  const {id, nome, colocacao, capa, desenvolvedora, dataLancamento, distribuidora, generos, sumario} = request.body

  jogos.push([id, nome, colocacao, capa, dataLancamento, desenvolvedora, distribuidora, generos, sumario])

  return response.json({ok: true})
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
