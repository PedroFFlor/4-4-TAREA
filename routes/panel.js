var express = require('express');
var util = require('util')
var cloudinary = require('cloudinary').v2
var router = express.Router();
var noticiasModels = require('../models/noticiasModels')
const uploader = util.promisify(cloudinary.uploader.upload)
const destroy = util.promisify(cloudinary.uploader.destroy)

router.get('/', async function (req, res, next) {

  var news = await noticiasModels.getNews();
  news = news.map(novedad => {
    if (novedad.img_id){
      const imagen = cloudinary.image(novedad.img_id,{
        width: 100,
        height: 100,
        crop: 'fill'
      })
      return {...novedad, imagen}
    } else {
      return {...novedad, imagen:''}
    }
  })

  if (req.session.admin) {

    res.render('panel', {
      tittle: 'Panel',
      nombre: req.session.nombre || undefined,
      admin: req.session.admin,
      vendedor: req.session.vendedor,
      news
    });
  } else {
    res.render('index', {
      title: 'Express',
      bienvenida: 'Tiene que ser administrador para ir al panel',
      nombre: req.session.nombre || undefined,
      admin: req.session.admin,
      vendedor: req.session.vendedor,
      news
    });
  }
});

router.get('/agregarNoticia', async function (req, res, next) {

  var news = await noticiasModels.getNews();
    news = news.map(novedad => {
      if (novedad.img_id){
        const imagen = cloudinary.image(novedad.img_id,{
          width: 100,
          height: 100,
          crop: 'fill'
        })
        return {...novedad, imagen}
      } else {
        return {...novedad, imagen:''}
      }
    })

    res.render('panel', {
      tittle: 'Panel',
      nombre: req.session.nombre || undefined,
      admin: req.session.admin,
      news,
      agregar: true
    });
  
});

router.post('/agregar', async function (req, res, next){

  try {
    var img_id = ''
    if (req.files && Object.keys(req.files).length > 0){
      imagen = req.files.imagen
      img_id = (await uploader(imagen.tempFilePath)).public_id
    }

    if (req.body.titulo != "" && req.body.cuerpo != ""){
      await noticiasModels.addNews({
        ...req.body,
        img_id
      });
      res.redirect('/panel')
    } else {
      var news = await noticiasModels.getNews();
      res.render('panel', {
        nombre: req.session.nombre || undefined,
        admin: req.session.admin,
        news,
        agregar: true,
        error: true,
        mensaje: "Debe completar todos los datos."
      })
    }
  }catch{
    var news = await noticiasModels.getNews();
    res.render('panel',{
        nombre: req.session.nombre || undefined,
        admin: req.session.admin,
        news,
        error: true,
        mensaje: "No se cargo la noticia."
    })
  }
})

router.get('/eliminarNoticia/:id', async function (req, res, next) {

  var id = req.params.id

  let novedad = await noticiasModels.getNewsById(id);
  if (novedad.img_id){
    await (destroy(novedad.img_id))
  }

  await noticiasModels.deleteNews(id);

  res.redirect('/panel');
  
});

router.get('/modificarNoticia/:id', async function (req, res, next) {

  var id = req.params.id;
  var modifyNews = await noticiasModels.getNewsById(id);

  res.render('panel', {
    tittle: 'Panel',
    nombre: req.session.nombre || undefined,
    admin: req.session.admin,
    modificar: true,
    modifyNews,
  });
  
});

router.post('/modificar', async function (req, res, next) {

  try {

    let img_id = req.body.img_original
    let borrar_img_vieja = false
    if (req.body.img_delete === "1") {
      img_id = null
      borrar_img_vieja = true
    } else {
      if (req.files && Object.keys(req.files).length > 0){
        imagen = req.files.imagen
        img_id = (await uploader(imagen.tempFilePath)).public_id
        borrar_img_vieja = true
      }
    }
    if ( borrar_img_vieja && req.body.img_original){
      await(destroy(req.body.img_original))
    }

    var newNew = {
      titulo: req.body.titulo,
      cuerpo: req.body.cuerpo,
      img_id
    }
    
    await noticiasModels.modifyNewsById(newNew, req.body.id)
    res.redirect('/panel')
    
  }catch (error) {
    console.log(error);
  }
  
});



module.exports = router;
