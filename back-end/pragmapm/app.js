var express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
require('./config/passport')(passport);
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');

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

app.use('/', avaliacoesRouter);
app.use('/', jogosRouter);
app.use('/', listasRouter);
app.use('/', perfilRouter);
app.use('/', forumRouter)

mongoose.connect('mongodb+srv://sarahcaulfieldlis:enTLXSHZrrwj2UkZ@gamelog-cluster.7j4rt.mongodb.net/?retryWrites=true&w=majority&appName=gamelog-cluster')
.then(() => console.log('Conexão com MongoDB bem-sucedida!'))
.catch(err => {
  console.error('Erro ao conectar ao MongoDB:', err.message);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
