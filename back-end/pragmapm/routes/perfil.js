var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {

  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.json([
    {
      "id": "0",
      "nome": "Usuário",
      "avatar": "https://via.placeholder.com/100",
      "descricao": "Oi eu sou um usuário do gamelog!",
      "analises": 0,
      "media": 0,
      "amigos": 0,
      "localizacao": "Minha Localização",
      "membroDesde": "07/12/24",
      "jogosAdicionados": 0,
      "completos": 0,
      "jogando": 0,
      "desejados": 0,
      "listasFixadasIds": [
        3,
        2
      ]
    },
    {
      "id": "1",
      "nome": "pacooooo",
      "avatar": "https://via.placeholder.com/100",
      "descricao": "Oi meu nome é paco e eu sou mt legal! Gosto de jojar jojos",
      "analises": 15,
      "media": 8.5,
      "amigos": 5,
      "localizacao": "Rio de Janeiro, RJ",
      "membroDesde": "10/10/24",
      "jogosAdicionados": 27,
      "completos": 15,
      "jogando": 4,
      "desejados": 8,
      "listasFixadasIds": [
        1
      ]
    },
    {
      "id": "2",
      "nome": "Ana Clara",
      "avatar": "https://via.placeholder.com/100",
      "descricao": "Gamer apaixonada por RPGs.",
      "analises": 25,
      "media": 4.8,
      "amigos": 130,
      "localizacao": "São Paulo, Brasil",
      "membroDesde": "2022",
      "jogosAdicionados": 45,
      "completos": 30,
      "jogando": 5,
      "desejados": 10,
      "listasFixadasIds": [
        0,
        2
      ]
    },
    {
      "id": "3",
      "nome": "Carlos Eduardo",
      "avatar": "https://via.placeholder.com/100",
      "descricao": "Streamer e entusiasta de FPS.",
      "analises": 15,
      "media": 4.2,
      "amigos": 80,
      "localizacao": "Rio de Janeiro, Brasil",
      "membroDesde": "2023",
      "jogosAdicionados": 20,
      "completos": 10,
      "jogando": 7,
      "desejados": 3,
      "listasFixadasIds": [
        1,
        3
      ]
    }
  ]);

});

module.exports = router;