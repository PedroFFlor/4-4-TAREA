var createError = require('http-errors');
var express = require('express');
var path = require('path');
const session = require('express-session')
require('dotenv').config()
var pool = require('./models/db')
var usersModel = require('./models/usersModels')
var fileUpload = require('express-fileupload')
var cors = require('cors')
var nodemailer = require('nodemailer')

var indexRouter = require('./routes/index');
var ofertasRouter = require('./routes/ofertas');
var mapaRouter = require('./routes/mapa');
var carpetaRouter = require('./routes/carpeta');
var condicionesRouter = require('./routes/condiciones');
var panelRouter = require('./routes/panel');
var apiRouter = require('./routes/api');

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

app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: '/tmp'
}));

app.use('/', indexRouter);
app.use('/ofertas', ofertasRouter);
app.use('/mapa', mapaRouter);
app.use('/carpeta', carpetaRouter);
app.use('/condiciones', condicionesRouter);
app.use('/panel', panelRouter);
app.use('/api', cors(), apiRouter);

app.post('/login', async (req, res, next) => {

  try {
    var user = req.body.user;
    var pass = req.body.pass;
    var data = await usersModel.getUserByLogin(user, pass);

    if (data != undefined) {
      req.session.id = data.id_usuario
      req.session.nombre = data.nombre
      if (data.rol == 'Administrador') {
        req.session.admin = true
        req.session.vendedor = false
      } else if (data.rol == 'Vendedor') {
        req.session.vendedor = true
        req.session.admin = false
      }
      res.render('index', {
        title: 'DistribuidoraX',
        nombre: req.session.nombre,
        admin: req.session.admin,
        vendedor: req.session.vendedor,
      });
    } else {
      res.render('index', {
        title: 'DistribuidoraX',
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
    title: 'DistribuidoraX',
    bienvenida: 'Sesion cerrada correctamente',
  });
});

app.post('/contacto', async function (req, res, next) {
  try {
    const mail = {
      to: 'react_node_utn@hotmail.com',
      subject: `WEB :${req.body.asunto}`,
      html: `<p>${req.body.nombre} se contacto por la web.</p>
          <p>Mensaje: ${req.body.mensaje}</p>
          <p>Datos:</p>
          <p>Nombre: ${req.body.nombre}</p>
          <p>Mail: ${req.body.mail}</p>
          <p>Telefono: ${req.body.telefono}</p>`,
    }

    var distribuidorax = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      }
    });

    await distribuidorax.sendMail(mail)

    res.render('index', {
      title: 'DistribuidoraX',
      nombre: req.session.nombre || undefined,
      admin: req.session.admin,
      vendedor: req.session.vendedor,
      contactMensaje: 'Mensaje Enviado!'
    });

  } catch (error) {
    console.log(error);

    res.render('index', {
      title: 'DistribuidoraX',
      nombre: req.session.nombre || undefined,
      admin: req.session.admin,
      vendedor: req.session.vendedor,
      contactMensaje: 'Hubo un problema, no se envio el mensaje'
    });
  }

});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
