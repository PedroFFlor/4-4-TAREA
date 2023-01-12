var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  let fecha = new Date();
  let fechaContacto = fecha.toLocaleString();

  res.render('contacto', {
    title: 'Contacto',
    telefono: '34136456548',
    direccion: 'la rioja 13121',
    fecha: fechaContacto,
    nombre: req.session.nombre || undefined,
    admin: req.session.admin
  });
});

module.exports = router;
