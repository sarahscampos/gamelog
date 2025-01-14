var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const cors = require('cors');

var indexRouter = require('./routes/index');
var avaliacoesRouter = require('./routes/avaliacoes');
var jogosRouter = require('./routes/jogos');
var listasRouter = require('./routes/listas');
var perfilRouter = require('./routes/perfil')

var app = express();

app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/avaliacoes', avaliacoesRouter);
app.use('/jogos', jogosRouter);
app.use('/listas', listasRouter);
app.use('/perfil', perfilRouter);

module.exports = app;
