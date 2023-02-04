var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function (req, res, next) {

  res.render('condiciones', {
    title: 'Condiciones',
    nombre: req.session.nombre || undefined,
    admin: req.session.admin,
    vendedor: req.session.vendedor,
  });
});

module.exports = router;
