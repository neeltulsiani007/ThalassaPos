var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRoutes = require('./routes/index')
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var itemsRouter = require('./routes/items');
var paymentsRouter = require('./routes/payment');
var orderRouter = require('./routes/orders')
var ingredientRouter = require('./routes/ingredients')
var refreshtokenRouter = require('./routes/refreshtokenroutes')
var expenseRouter = require('./routes/expenses')
var emailRouter = require('./routes/emailRoutes')
var dashboardRouter = require('./routes/dashboard')

const connect = require('./db')
var app = express();
var cors = require('cors');
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,            //access-control-allow-credentials:true
  optionSuccessStatus: 200,
}
app.use(cors(corsOptions));
connect()
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/',indexRoutes)
app.use('/',itemsRouter)
app.use('/',orderRouter)
app.use('/',ingredientRouter)
app.use('/',refreshtokenRouter)
app.use('/',expenseRouter)
app.use('/',emailRouter)
app.use('/',dashboardRouter)
app.use('/',paymentsRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
