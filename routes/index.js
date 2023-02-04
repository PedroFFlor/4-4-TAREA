var express = require('express');
var cloudinary = require('cloudinary').v2
var router = express.Router();
var noticiasModels = require('../models/noticiasModels')


/* GET home page. */
router.get('/', async function (req, res, next) {

  var news = await noticiasModels.getNews();
  news = news.map(novedad => {
    if (novedad.img_id) {
      const imagen = cloudinary.image(novedad.img_id, {
        width: 300,
        height: 200,
        crop: 'fill'
      })
      return { ...novedad, imagen }
    } else {
      return { ...novedad, imagen: '' }
    }
  })
  
  res.render('index', {
    title: 'DistribuidoraX',
    nombre: req.session.nombre || undefined,
    admin: req.session.admin,
    vendedor: req.session.vendedor,
    news
  });

});

module.exports = router;
