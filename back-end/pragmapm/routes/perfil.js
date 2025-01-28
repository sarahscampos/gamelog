const express = require('express');
const router = express.Router();
const Perfil = require('../models/Perfil');
/*
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
]*/

// pega todos os usuários
router.get('/perfil', async (request, response) => {
  try {
    const usuarios = await Perfil.find();
    response.json(usuarios);
  } catch (error) {
    response.status(500).json({ message: 'Erro ao obter usuários', error });
  }
});

// pega um único usuário
router.get('/perfil/:id', async (request, response) => {
  try {
    const usuario = await Perfil.findById(request.params.id);
    if (!usuario) return response.status(404).json({ message: 'Usuário não encontrado' });
    response.json(usuario);
  } catch (error) {
    response.status(500).json({ message: 'Erro ao obter usuário', error });
  }
});

// cria um usuário
router.post('/perfil', async (request, response) => {
  try {
    const novoUsuario = new Perfil(request.body);  // Criando uma instância do modelo Perfil
    await novoUsuario.save();
    response.status(201).json(novoUsuario);
  } catch (error) {
    response.status(500).json({ message: 'Erro ao criar usuário', error });
  }
});

// atualiza um usuário
router.put('/perfil/:id', async (request, response) => {
  try {
    const usuario = await Perfil.findByIdAndUpdate(request.params.id, request.body, { new: true });
    if (!usuario) return response.status(404).json({ message: 'Usuário não encontrado' });
    response.json(usuario);
  } catch (error) {
    response.status(500).json({ message: 'Erro ao atualizar usuário', error });
  }
});

// deleta um usuário
router.delete('/perfil/:id', async (request, response) => {
  try {
    const usuario = await Perfil.findByIdAndDelete(request.params.id);
    if (!usuario) return response.status(404).json({ message: 'Usuário não encontrado' });
    response.json(usuario);
  } catch (error) {
    response.status(500).json({ message: 'Erro ao deletar usuário', error });
  }
});

module.exports = router;