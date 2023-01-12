var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Express',
    bienvenida: 'bienvenido',
    nombre: req.session.nombre || undefined,
    admin: req.session.admin,
  });
});

module.exports = router;
