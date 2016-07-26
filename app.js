var express      = require('express');
var path         = require('path');
var favicon      = require('serve-favicon');
// var logger       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');

var routes       = require('./routes/index');
var user         = require('./routes/user');
var appRoute     = require('./routes/app');
var media        = require('./routes/media');
var recommend    = require('./routes/recommend');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret : 'asd89a90sdjnd98jd98jad09a' }));

app.use(function(req, res, next) {
  var sess = req.session;
  // sess.username = 'icaromh';
  if (req.path == '/user/login' || sess.username) {
    next();
  } else {
    res.redirect('/user/login');
  }
});

app.use('/', routes);
app.use('/user', user);
app.use('/app', appRoute);
app.use('/media', media);
app.use('/recommend', recommend);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
