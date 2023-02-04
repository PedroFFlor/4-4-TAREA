var express = require('express');
var cloudinary = require('cloudinary').v2
var util = require('util')
var router = express.Router();
var noticiasModels = require('../models/noticiasModels')
var usersModel = require('../models/usersModels')
const uploader = util.promisify(cloudinary.uploader.upload)
const destroy = util.promisify(cloudinary.uploader.destroy)
var nodemailer = require('nodemailer')

let productos = [
  {
    codigo: 310101,
    desc : '9 de oro clasica x 200grs',
    marca : '9 de oro',
    rubro : 'Galletitas',
    precio : 300,
    embalaje : 20,
    esOferta : false,
    esRepresentacion : false,
    rutaImg :'310101.jpg'
  },
  {
    codigo: 310102,
    desc : '9 de oro agridulce x 200grs',
    marca : '9 de oro',
    rubro : 'Galletitas',
    precio : 300,
    embalaje : 20,
    esOferta : false,
    esRepresentacion : false,
    rutaImg :'310102.jpg'
  },
  {
    codigo: 310103,
    desc : '9 de oro azucarada x 200grs',
    marca : '9 de oro',
    rubro : 'Galletitas',
    precio : 300,
    embalaje : 20,
    esOferta : false,
    esRepresentacion : false,
    rutaImg :'310103.jpg'
  },
  {
    codigo: 311101,
    desc : 'Natura mayonesa x 250grs',
    marca : 'Natura',
    rubro : 'Aderezos',
    precio : 240,
    embalaje : 12,
    esOferta : false,
    esRepresentacion : false,
    rutaImg :'311101.jpg'
  },
  {
    codigo: 311102,
    desc : 'Natura salsa golf x 250grs',
    marca : 'Natura',
    rubro : 'Aderezos',
    precio : 260,
    embalaje : 12,
    esOferta : false,
    esRepresentacion : false,
    rutaImg :'311102.jpg'
  },
  {
    codigo: 311103,
    desc : 'Natura mostaza x 250grs',
    marca : 'Natura',
    rubro : 'Aderezos',
    precio : 310,
    embalaje : 12,
    esOferta : false,
    esRepresentacion : false,
    rutaImg :'311103.jpg'
  },
  {
    codigo : 530101,
    desc : 'Trimacer arroz "0000" x 500grs',
    marca : 'Trimacer',
    rubro : 'Arroz',
    precio : 90,
    embalaje : 10,
    esOferta : true,
    esRepresentacion : true,
    rutaImg :'530101.jpg'
  },
  {
    codigo : 530301,
    desc : 'Trimacer arroz "0000" x 1KG',
    marca : 'Trimacer',
    rubro : 'Arroz',
    precio : 190,
    embalaje : 10,
    esOferta : true,
    esRepresentacion : true,
    rutaImg :'530302.jpg'
  },
  {
    codigo : 530201,
    desc : 'Trimacer arroz integral x 500grs',
    marca : 'Trimacer',
    rubro : 'Arroz',
    precio : 320,
    embalaje : 10,
    esOferta : true,
    esRepresentacion : true,
    rutaImg :'530201.jpg'
  },
  {
    codigo : 30101,
    desc : 'Chacabuco harina comun x 1 kg',
    marca : 'Chacabuco',
    rubro : 'Harinas',
    precio : 160,
    embalaje : 10,
    esOferta : true,
    esRepresentacion : true,
    rutaImg :'30101.jpg'
  },
  {
    codigo : 30301,
    desc : 'Chacabuco harina leudante x 1 kg',
    marca : 'Chacabuco',
    rubro : 'Harinas',
    precio : 190,
    embalaje : 10,
    esOferta : true,
    esRepresentacion : true,
    rutaImg :'30301.jpg'
  },
  {
    codigo : 30201,
    desc : 'Chacabuco harina "0000" x 1 kg',
    marca : 'Chacabuco',
    rubro : 'Harinas',
    precio : 170,
    embalaje : 10,
    esOferta : true,
    esRepresentacion : true,
    rutaImg :'30201.jpg'
  },
  {
    codigo : 220101,
    desc : 'Crieky mani salado x 1kg',
    marca : 'Criskey',
    rubro : 'Copetin',
    precio : 340,
    embalaje : 10,
    esOferta : false,
    esRepresentacion : true,
    rutaImg :'220101.jpg'
  },
  {
    codigo : 220102,
    desc : 'Crieky puflitos x 1kg',
    marca : 'Criskey',
    rubro : 'Copetin',
    precio : 750,
    embalaje : 6,
    esOferta : false,
    esRepresentacion : true,
    rutaImg :'220102.jpg'
  },
  {
    codigo : 220103,
    desc : 'De La Huerta pure de tomate x 500grs',
    marca : 'Baggio',
    rubro : 'Conservas',
    precio : 260,
    embalaje : 12,
    esOferta : false,
    esRepresentacion : true,
    rutaImg :'220103.jpg'
  },
  {
    codigo : 220104,
    desc : 'De La Huerta pure de tomate x 180grs',
    marca : 'Baggio',
    rubro : 'Conservas',
    precio : 130,
    embalaje : 18,
    esOferta : false,
    esRepresentacion : true,
    rutaImg :'220104.jpg'
  },
  {
    codigo : 410101,
    desc : 'Ayudin lavandina x 1L',
    marca : 'Ayudin',
    rubro : 'Limpieza',
    precio : 230,
    embalaje : 15,
    esOferta : true,
    esRepresentacion : false,
    rutaImg :'410101.jpg'
  },
  {
    codigo : 410102,
    desc : 'Ayudin lavandina x 2L',
    marca : 'Ayudin',
    rubro : 'Limpieza',
    precio : 450,
    embalaje : 8,
    esOferta : true,
    esRepresentacion : false,
    rutaImg :'410102.jpg'
  },
  {
    codigo : 410103,
    desc : 'Dove antitranspirante x 150ml',
    marca : 'Dove',
    rubro : 'Perfumeria',
    precio : 330,
    embalaje : 12,
    esOferta : true,
    esRepresentacion : false,
    rutaImg :'410103.jpg'
  },
  {
    codigo : 410104,
    desc : 'Dove  rollon antitranspirante x110',
    marca : 'Dove',
    rubro : 'Perfumeria',
    precio : 300,
    embalaje : 12,
    esOferta : true,
    esRepresentacion : false,
    rutaImg :'410104.jpg'
  },
  
  
  
]; 

router.get('/Home', async function (req, res, next) {

  let news = await noticiasModels.getNews();
  news = news.map(novedad => {
    if (novedad.img_id){
      const imagen = cloudinary.url(novedad.img_id,{
        width: 300,
        height: 200,
        crop: 'fill'
      })
      return {...novedad, imagen}
    } else {
      return {...novedad, imagen:''}
    }
  })
  res.json(news)
  
});

router.post('/login', async function (req, res, next) { 

  try {
    let user =  req.body.user;
    let pass =  req.body.pass;
    let data = await usersModel.getUserByLogin(user,pass);

    if (data != undefined){ 
      req.session.id = data.id_usuario
      req.session.nombre = data.nombre
      if (data.rol == 'Administrador') {
        req.session.admin = true
        req.session.vendedor = true
      } else if(data.rol == 'Vendedor') {
        req.session.admin = false
        req.session.vendedor = true
      } else {
        req.session.admin = false
        req.session.vendedor = false
      }
      datos = { 
        title: 'Home',
        bienvenida: 'data esta definidom, paso user y pw',
        nombre: req.session.nombre,
        admin: req.session.admin,
        vendedor: req.session.vendedor
      }
    } else {
      datos = { 
        title: 'Home',
        bienvenida: 'data no esta definido',
        error: true,
      }
    }
  } catch (error) {
    datos = {error} 
    console.log(error);
  }
  res.json(datos)
});

router.get('/logout', async function (req, res, next) {  

  req.session.destroy();
  datos = { 
    title: 'Home',
    bienvenida: 'Sesion cerrada correctamente',
    nombre: '',
    admin: false,
    vendedor: false
  }

  res.json(datos)
  
});

router.post('/panel/agregar', async function (req, res, next) {

  try {
    let img_id = null
    if (req.files && Object.keys(req.files).length > 0){
      imagen = req.files.imagen
      img_id = (await uploader(imagen.tempFilePath)).public_id
    }
   
    if (req.body.titulo != "" && req.body.cuerpo != ""){
      await noticiasModels.addNews({
        ...req.body,
        img_id
      });
      
    data = { error : false }

    } else {
      data = {
        error: true,
        mensaje: "Debe completar todos los datos."
      }
    }
  }catch{
    data = {
      error: true,
      mensaje: "No se cargo la noticia."
    }
  }

  res.json(data)
});

router.get('/panel/eliminarNoticia/:id', async function (req, res, next) { 
  let id = req.params.id

  let novedad = await noticiasModels.getNewsById(id);
  
  if (novedad.img_id != null ){
    await (destroy(novedad.img_id))
  }
  
  let data = await noticiasModels.deleteNews(id);
  
  res.json(data)
});

router.get('/panel/modificarNoticia/:id', async function (req, res, next) { 

  var id = req.params.id;
  var modifyNews = await noticiasModels.getNewsById(id);

  res.json(modifyNews)

});

router.post('/panel/modificarNoticia', async function (req, res, next) { 

  try {

    let img_id_viejo = req.body.img_id
    let borrar_img_vieja = false

    if (req.body.img_delete === "true") {
      borrar_img_vieja = true
      img_id = null

    }
    if (req.files && Object.keys(req.files).length > 0){
      imagen = req.files.imagen
      img_id = (await uploader(imagen.tempFilePath)).public_id //
      borrar_img_vieja = true
      
    }
    if ( borrar_img_vieja && img_id_viejo != null){
      await(destroy(img_id_viejo))
    }

    var newNew = {
      titulo: req.body.titulo,
      cuerpo: req.body.cuerpo,
      img_id
    }
    
    await noticiasModels.modifyNewsById(newNew, req.body.id)

    
  }catch (error) {
    console.log(error);
  }
  
  res.json()
  
});

router.get('/carpeta/productos', async function (req, res, next) {

  res.json(productos)
  
});

router.post('/contacto', async function (req, res, next) {

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

  res.status(201).json({
    error:false,
    mensaje: 'Mensaje Enviado!'
  })
});



module.exports = router;
