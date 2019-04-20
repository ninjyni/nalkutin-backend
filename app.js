var createError = require('http-errors');
var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport = require('passport');

var loginRouter = require('./routes/login');
var taskRouter = require('./routes/tasks');
var userRouter = require('./routes/users');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.disable('x-powered-by');

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

// Just check the presence of token cookie for now.
app.use(function(req, res, next) {
  if (req.cookies.token) {
    res.locals.loggedIn = true;
  }
  next();
});

app.use(passport.initialize());

app.use('/login', loginRouter);
app.use('/tasks', taskRouter);
app.use('/users', userRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.json({ error: err });
});

module.exports = app;
