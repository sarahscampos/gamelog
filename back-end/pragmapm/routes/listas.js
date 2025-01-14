var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/:id', function(req, res, next) {

  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.json([
    {
      "id": "0",
      "listas": [
        {
          "id": 0,
          "nome": "Favoritos",
          "ids": [
            "0",
            "1",
            "2"
          ]
        },
        {
          "id": 1,
          "nome": "Desejados",
          "ids": [
            "2",
            "3"
          ]
        },
        {
          "id": 2,
          "nome": "SoulsLikes Favoritos",
          "ids": [
            "0"
          ]
        },
        {
          "id": 3,
          "nome": "RPGs infancia",
          "ids": [
            "0"
          ]
        },
        {
          "id": 4,
          "nome": "FINAL FANTASY's",
          "ids": [
            "0"
          ]
        }
      ]
    },
    {
      "id": "1",
      "listas": [
        {
          "id": 0,
          "nome": "Favoritos",
          "ids": [
            "6",
            "7"
          ]
        }
      ]
    }
  ]);

});

module.exports = router;
