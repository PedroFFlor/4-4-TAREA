var createError = require('http-errors');
var express = require('express');
var path = require('path');
const session = require('express-session')
require('dotenv').config()
var pool = require('./models/db')
var usersModel = require('./models/usersModels')

var indexRouter = require('./routes/index');
var contactoRouter = require('./routes/contacto');
var galeriaRouter = require('./routes/galeria');
var panelRouter = require('./routes/panel');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'asd123asd123',
  resave: false,
  saveUninitialized: true
}));


app.use('/', indexRouter);
app.use('/contacto', contactoRouter );
app.use('/galeria', galeriaRouter);
app.use('/panel', panelRouter);

app.post('/login', async (req, res, next) => { 

  try {
    var user = req.body.user;
    var pass = req.body.pass;
    var data = await usersModel.getUserByLogin(user,pass);

    if (data != undefined){
      req.session.id = data.id_usuario
      req.session.nombre = data.nombre
      if (data.rol == 'Administrador') {
        req.session.admin = true
      } else req.session.admin = false
      res.render('index', { 
        title: 'Home',
        bienvenida: 'data esta definidom, paso user y pw',
        nombre: req.session.nombre,
        rol: req.session.rol
      });
    } else {
      res.render('index', { 
        title: 'Home',
        bienvenida: 'data no esta definido',
        error: true,
      });
    }
  } catch (error) {
    console.log(error);
  }
})

app.get('/admin/logout', (req, res, next) => {
  req.session.destroy();
  res.render('index', { 
    title: 'Home',
    bienvenida: 'Este es el home de la tarea del modulo 4 unidad 3!!!',
  }); 
});

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
