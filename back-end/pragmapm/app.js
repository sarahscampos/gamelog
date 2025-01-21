var express = require('express');
const mongoose = require('mongoose')
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');

var indexRouter = require('./routes/index.js');
var avaliacoesRouter = require('./routes/avaliacoes.js');
var jogosRouter = require('./routes/jogos.js');
var listasRouter = require('./routes/listas.js');
var perfilRouter = require('./routes/perfil.js')
var forumRouter = require('./routes/forum.js')

var app = express();
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use('/', indexRouter);
app.use('/avaliacoes', avaliacoesRouter);
app.use('/jogos', jogosRouter);
app.use('/listas', listasRouter);
app.use('/perfil', perfilRouter);
app.use('/forum', forumRouter)

mongoose.connect('mongodb+srv://<username>:<password>@gamelog-cluster.7j4rt.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Conexão com MongoDB bem-sucedida!'))
.catch(err => {
  console.error('Erro ao conectar ao MongoDB:', err.message);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});