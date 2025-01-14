const express = require('express');
const server = express();
//const Usuario = require('../models/Perfil');

server.listen(3004)
server.use(express.json())

let usuarios = [{
  id: "0",
  nome: "Usuário",
  avatar: "https://via.placeholder.com/100",
  descricao: "Oi eu sou um usuário do gamelog!",
  analises: 0,
  media: 0,
  amigos: 0,
  localizacao: "Minha Localização",
  membroDesde: "07/12/24",
  jogosAdicionados: 0,
  completos: 0,
  jogando: 0,
  desejados: 0,
  listasFixadasIds: [3, 2],
},
{
  id: "1",
  nome: "pacooooo",
  avatar: "https://via.placeholder.com/100",
  descricao: "Oi meu nome é paco e eu sou mt legal! Gosto de jojar jojos",
  analises: 15,
  media: 8.5,
  amigos: 5,
  localizacao: "Rio de Janeiro, RJ",
  membroDesde: "10/10/24",
  jogosAdicionados: 27,
  completos: 15,
  jogando: 4,
  desejados: 8,
  listasFixadasIds: [1],
},
{
  id: "2",
  nome: "Ana Clara",
  avatar: "https://via.placeholder.com/100",
  descricao: "Gamer apaixonada por RPGs.",
  analises: 25,
  media: 4.8,
  amigos: 130,
  localizacao: "São Paulo, Brasil",
  membroDesde: "2022",
  jogosAdicionados: 45,
  completos: 30,
  jogando: 5,
  desejados: 10,
  listasFixadasIds: [0, 2],
}
]

// pega todos usuarios
server.get('/usuarios', (request, response) => {
  response.json(usuarios);
});

// pega um unico usuario
server.get('/usuarios/:id', (request, response) => {
  const usuario = usuarios.find(u => u.id === request.params.id);
  if (!usuario) return response.status(404).json({ message: 'Usuario nao encontrado' });
  response.json(usuario);
});

// cria um usuario
server.post('/usuarios', (request, response) => {
  const novoUsuario = { id: Date.now().toString(), ...request.body };
  usuarios.push(novoUsuario);
  response.status(201).json(novoUsuario);
});

// atualiza um usuario
server.put('/usuarios/:id', (request, response) => {
  const index = usuarios.findIndex(u => u.id === request.params.id);
  if (index === -1) return response.status(404).json({ message: 'Usuario nao encontrado' });
  usuarios[index] = { ...usuarios[index], ...request.body };
  response.json(usuarios[index]);
});

// deleta um usuario
server.delete('/usuarios/:id', (request, response) => {
  const index = usuarios.findIndex(u => u.id === request.params.id);
  if (index === -1) return response.status(404).json({ message: 'Usuario nao encontrado' });
  const deletedUser = usuarios.splice(index, 1);
  response.json(deletedUser[0]);
});

module.exports = server;