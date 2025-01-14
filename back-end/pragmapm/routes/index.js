var express = require('express')

const server = express()
server.listen(3004)

var router = express.Router();

/* GET home page. */
/*router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' })
})*/

server.get('/abacate', (req,res) => {
  return res.send("esse é meu abacate")
})

module.exports = router;
