var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var helmet = require('helmet');
var cors = require('cors');


var gamesRouter = require('./routes/games');
var playersRouter = require('./routes/players');
var ratingsRouter = require('./routes/ratings');
var scoresRouter = require('./routes/scores');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/games', gamesRouter);
app.use('/players', playersRouter);
app.use('/ratings', ratingsRouter);
app.use('/scores', scoresRouter);
app.use(helmet());
app.use(cors());

module.exports = app;
