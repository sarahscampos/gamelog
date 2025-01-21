/*var express = require('express');
var router = express.Router();*/

/* GET users listing. */

/*
router.get('/:id', function(req, res, next) {

  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.json();

});*/

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

let data = [
  {
    id: "0",
    listas: [
      { id: 0, nome: "Favoritos", ids: ["0", "1", "2"] },
      { id: 1, nome: "Desejados", ids: ["2", "3"] },
    ],
  },
  {
    id: "1",
    listas: [
      { id: 0, nome: "Favoritos", ids: ["6", "7"] },
    ],
  },
];

// GET /listas/:userId
app.get('/listas/:userId', (req, res) => {
  const user = data.find((user) => user.id === req.params.userId);
  if (!user) {
    return res.status(404).json({ error: 'Usuário não encontrado' });
  }
  res.status(200).json(user);
});

// POST /listas/:userId
app.post('/listas/:userId', (req, res) => {
  const user = data.find((user) => user.id === req.params.userId);
  if (!user) {
    return res.status(404).json({ error: 'Usuário não encontrado' });
  }

  const novaLista = req.body;
  if (user.listas.some((lista) => lista.id === novaLista.id)) {
    return res.status(400).json({ error: 'Lista com esse ID já existe' });
  }

  user.listas.push(novaLista);
  res.status(201).json(user.listas);
});

// PATCH /listas/:userId/:idLista
app.patch('/listas/:userId/:idLista', (req, res) => {
  const user = data.find((user) => user.id === req.params.userId);
  if (!user) {
    return res.status(404).json({ error: 'Usuário não encontrado' });
  }

  const lista = user.listas.find((lista) => lista.id == req.params.idLista);
  if (!lista) {
    return res.status(404).json({ error: 'Lista não encontrada' });
  }

  const { idJogo } = req.body;
  if (lista.ids.includes(idJogo)) {
    return res.status(400).json({ error: 'Jogo já está na lista' });
  }

  lista.ids.push(idJogo);
  res.status(200).json(lista);
});

// PATCH /listas/:userId/:idLista/remove
app.patch('/listas/:userId/:idLista/remove', (req, res) => {
  const user = data.find((user) => user.id === req.params.userId);
  if (!user) {
    return res.status(404).json({ error: 'Usuário não encontrado' });
  }

  const lista = user.listas.find((lista) => lista.id == req.params.idLista);
  if (!lista) {
    return res.status(404).json({ error: 'Lista não encontrada' });
  }

  const { idJogo } = req.body;
  const index = lista.ids.indexOf(idJogo);
  if (index === -1) {
    return res.status(400).json({ error: 'Jogo não encontrado na lista' });
  }

  lista.ids.splice(index, 1);
  res.status(200).json(lista);
});

// DELETE /listas/:userId/:idLista
app.delete('/listas/:userId/:idLista', (req, res) => {
  const user = data.find((user) => user.id === req.params.userId);
  if (!user) {
    return res.status(404).json({ error: 'Usuário não encontrado' });
  }

  const index = user.listas.findIndex((lista) => lista.id == req.params.idLista);
  if (index === -1) {
    return res.status(404).json({ error: 'Lista não encontrada' });
  }

  user.listas.splice(index, 1);
  res.status(200).json(user.listas);
});

// Porta do servidor
/*const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});*/

module.exports = app;
