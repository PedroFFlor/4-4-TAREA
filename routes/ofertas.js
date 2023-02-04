var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  
  res.render('ofertas', {
    title: 'Ofertas',
    nombre: req.session.nombre || undefined,
    vendedor: req.session.vendedor,
    admin: req.session.admin
    
  });
});

module.exports = router;
