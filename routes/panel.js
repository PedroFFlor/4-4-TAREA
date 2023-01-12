var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  if (req.session.nombre) {
    res.render('panel', {
      tittle: 'Panel',
      nombre: req.session.nombre || undefined,
      admin: req.session.admin
    });
  } else {
    res.render('index', {
      title: 'Express',
      bienvenida: 'Tiene que ser administrador para ir al panel',
      nombre: req.session.nombre || undefined,
      admin: req.session.admin,
    });
  }
});

module.exports = router;
