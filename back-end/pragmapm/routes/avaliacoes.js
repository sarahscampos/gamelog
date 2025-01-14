var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {

  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.json({
    "0": [
      {
        "usuario": "Luigi",
        "nota": 10,
        "comentario": "Adorei o jogo! Sempre jogamos com os amigos.",
        "imgSrc": "https://m.media-amazon.com/images/I/516GYeRR9WL._AC_UF894,1000_QL80_.jpg"
      },
      {
        "usuario": "Peach",
        "nota": 9,
        "comentario": "Ótimo jogo, mas algumas pistas poderiam ser mais desafiadoras.",
        "imgSrc": "https://p2.trrsf.com.br/image/fget/cf/540/960/smart/images.terra.com/2024/03/20/card-1-peach-ts572v0ihgza.jpg"
      },
      {
        "usuario": "Bowser",
        "nota": 8,
        "comentario": "Muito divertido, mas prefiro os clássicos.",
        "imgSrc": "https://m.media-amazon.com/images/I/71HW-x8cH+L._AC_UF894,1000_QL80_.jpg"
      }
    ],
    "1": [
      {
        "usuario": "Jin",
        "nota": 10,
        "comentario": "Uma verdadeira obra-prima. A história é cativante.",
        "imgSrc": "https://cdn.awsli.com.br/600x700/222/222813/produto/110661252/5a9e3133b9.jpg"
      },
      {
        "usuario": "Yuna",
        "nota": 9,
        "comentario": "Gameplay incrível, mas senti falta de algumas melhorias no combate furtivo.",
        "imgSrc": "https://cdn.awsli.com.br/600x700/222/222813/produto/110661252/5a9e3133b9.jpg"
      },
      {
        "usuario": "Khotun",
        "nota": 7,
        "comentario": "Jogo bom, mas esperava mais no modo exploração.",
        "imgSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/YuanEmperorAlbumGenghisPortrait.jpg/330px-YuanEmperorAlbumGenghisPortrait.jpg"
      }
    ],
    "2": [
      {
        "usuario": "Zelda",
        "nota": 10,
        "comentario": "O mundo aberto é fantástico, cheio de detalhes.",
        "imgSrc": "https://play.nintendo.com/images/Gallery_Lozbotw_15.aaaec624.2d958659.jpg"
      },
      {
        "usuario": "Link",
        "nota": 10,
        "comentario": "Incrível! Um dos melhores jogos da minha vida.",
        "imgSrc": "https://www.zeldadungeon.net/wiki/images/thumb/c/ce/Link_-_TotK_art_02_alt.png/400px-Link_-_TotK_art_02_alt.png"
      },
      {
        "usuario": "Ganon",
        "nota": 8,
        "comentario": "Ótimo, mas acho que poderia ser mais desafiador em certas partes.",
        "imgSrc": "https://images.squarespace-cdn.com/content/v1/58d66569b3db2b57ce7db1e2/1694545656330-WG7I8ILCYMHJ436XZGA9/ganon+zoom+1.jpg"
      }
    ],
    "3": [
      {
        "usuario": "Arthur",
        "nota": 10,
        "comentario": "Narrativa incrível, ambientação impecável.",
        "imgSrc": "https://http2.mlstatic.com/D_NQ_NP_810647-MLB42808104113_072020-O.webp"
      },
      {
        "usuario": "Dutch",
        "nota": 9,
        "comentario": "Uma experiência épica, mas demorei para me adaptar aos controles.",
        "imgSrc": "https://oyster.ignimgs.com/mediawiki/apis.ign.com/red-dead-redemption-2/7/7c/ThHAP39JQI.jpg"
      },
      {
        "usuario": "Sadie",
        "nota": 9,
        "comentario": "Adorei! Mas poderia ter mais missões secundárias interessantes.",
        "imgSrc": "https://oyster.ignimgs.com/mediawiki/apis.ign.com/red-dead-redemption-2/7/7c/ThHAP39JQI.jpg"
      }
    ],
    "4": [
      {
        "usuario": "Geralt",
        "nota": 10,
        "comentario": "História envolvente, cheio de escolhas que realmente importam.",
        "imgSrc": "https://tm.ibxk.com.br/2022/12/23/23110710926049.jpg"
      },
      {
        "usuario": "Yennefer",
        "nota": 9,
        "comentario": "Visual maravilhoso, mas o combate podia ser mais fluido.",
        "imgSrc": "https://image.api.playstation.com/cdn/UP4497/CUSA00527_00/65vdrfyv7RwISVz8ATFr2DKSmUeaIuz2.png"
      },
      {
        "usuario": "Ciri",
        "nota": 8,
        "comentario": "Gostei bastante, mas achei a curva de aprendizado inicial difícil.",
        "imgSrc": "https://s2-techtudo.glbimg.com/jKDQdpF0Cv4VwkUg0Dw8StfShhQ=/0x0:695x390/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_08fbf48bc0524877943fe86e43087e7a/internal_photos/bs/2021/I/U/zsD8U5TeWZiqJDPRcc3A/2014-12-16-witcher-3-ciri-rpg.jpg"
      }
    ],
    "5": [
      {
        "usuario": "Kratos",
        "nota": 10,
        "comentario": "Simplesmente épico, cheio de emoção e ação.",
        "imgSrc": "https://selectgame.gamehall.com.br/wp-content/uploads/2021/09/cropped-Freya-em-God-of-War-Ragnarok-Capa.jpg"
      },
      {
        "usuario": "Atreus",
        "nota": 9,
        "comentario": "Ótima narrativa, mas senti falta de mais opções de personalização.",
        "imgSrc": "https://oyster.ignimgs.com/mediawiki/apis.ign.com/god-of-war-ragnarok/1/1b/Ater.jpg"
      },
      {
        "usuario": "Freya",
        "nota": 8,
        "comentario": "Muito bom, mas algumas partes são repetitivas.",
        "imgSrc": "https://oyster.ignimgs.com/mediawiki/apis.ign.com/god-of-war-ragnarok/9/93/Freya.jpg"
      }
    ],
    "6": [
      {
        "usuario": "Hornet",
        "nota": 10,
        "comentario": "Desafios incríveis, adoro explorar o mundo.",
        "imgSrc": "https://pm1.aminoapps.com/6783/9b1433c160fafdad459bab201f51b78e6a07a9dav2_00.jpg"
      },
      {
        "usuario": "Knight",
        "nota": 9,
        "comentario": "Ótima jogabilidade, mas algumas áreas são confusas.",
        "imgSrc": "https://cdn.awsli.com.br/2657/2657807/produto/270496847/photo_5094015974415379628_x-4ucvc1908c.jpg"
      },
      {
        "usuario": "Grimm",
        "nota": 8,
        "comentario": "Belo design, mas não é muito acessível para iniciantes.",
        "imgSrc": "https://cdn.awsli.com.br/2657/2657807/produto/270496847/photo_5094015974415379628_x-4ucvc1908c.jpg"
      }
    ]
  });
})
module.exports = router;
