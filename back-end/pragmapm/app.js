var express = require('express');
const mongoose = require('mongoose')
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');

var indexRouter = require('./routes/index');
var avaliacoesRouter = require('./routes/avaliacoes');
var jogosRouter = require('./routes/jogos');
var listasRouter = require('./routes/listas');
var perfilRouter = require('./routes/perfil')
var forumRouter = require('./routes/forum')

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

mongoose.connect('mongodb+srv://sarahcaulfieldlis:enTLXSHZrrwj2UkZ@gamelog-cluster.7j4rt.mongodb.net/?retryWrites=true&w=majority&appName=gamelog-cluster', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});