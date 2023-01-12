var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('galeria', {
    title: 'Galeria',
    nombre: req.session.nombre || undefined,
    admin: req.session.admin,
    productos: [
      {
        nombreProducto: 'Producto1',
        embalaje: 12,
        precio: 1234.12,
        imagen: '/images/galeria1.jpg'
      },
      {
        nombreProducto: 'Producto2',
        embalaje: 12,
        precio: 1234.12,
        imagen: '/images/galeria2.jpg'
      },
      {
        nombreProducto: 'Producto3',
        embalaje: 12,
        precio: 1234.12,
        imagen: '/images/galeria3.jpg'
      }
    ]
  });
});

module.exports = router;
