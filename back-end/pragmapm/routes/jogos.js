var express = require('express');
var server = express();
const mongoose = require('mongoose');

const uri = 'mongodb+srv://sarahcaulfieldlis:enTLXSHZrrwj2UkZ@gamelog-cluster.7j4rt.mongodb.net/?retryWrites=true&w=majority&appName=gamelog-cluster';

mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conectado ao MongoDB Atlas com sucesso!'))
  .catch((err) => console.error('Erro ao conectar ao MongoDB Atlas:', err));


  const Jogo = mongoose.model('Jogo', new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    nome: { type: String, required: true },
    colocacao: { type: Number, required: true },
    capa: { type: String, required: true },
    desenvolvedora: { type: String, required: true },
    dataLancamento: { type: Date, required: true },
    distribuidora: { type: String, required: true },
    generos: { type: [String], required: true },
    sumario: { type: String, required: true }
  }));

server.listen(3004)
server.use(express.json())

server.post("/jogos", async (request, response) => {
  const { id, nome, colocacao, capa, desenvolvedora, dataLancamento, distribuidora, generos, sumario } = request.body;

  // Validação dos campos obrigatórios
  if (!id || !nome || !colocacao || !capa || !desenvolvedora || !dataLancamento || !distribuidora || !generos || !sumario) {
    return response.status(400).json({ error: "Todos os campos são obrigatórios" });
  }

  // Verificar se o jogo já existe
  const jogoJaExiste = await Jogo.findOne({ id });
  if (jogoJaExiste) {
    return response.status(409).json({ error: "Já existe um jogo com esse id" });
  }

  // Criar o novo jogo e salvar no MongoDB
  const novoJogo = new Jogo({ id, nome, colocacao, capa, desenvolvedora, dataLancamento, distribuidora, generos, sumario });
  
  try {
    await novoJogo.save();
    return response.status(201).json({ message: "Novo jogo adicionado", jogo: novoJogo });
  } catch (err) {
    return response.status(500).json({ error: "Erro ao salvar o jogo", details: err });
  }
});

// Rota GET para listar os jogos
server.get("/jogos", async (request, response) => {
  try {
    const jogos = await Jogo.find();
    return response.json(jogos);
  } catch (err) {
    return response.status(500).json({ error: "Erro ao buscar jogos", details: err });
  }
});

/* GET users listing. */
/*router.get('/', function(req, res, next) {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.json();
})*/

//module.exports = router;