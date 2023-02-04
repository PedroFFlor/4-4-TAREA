var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function (req, res, next) {
  let productos = [
    {
      codigo: 310101,
      desc: '9 de oro clasica x 200grs',
      marca: '9 de oro',
      rubro: 'Galletitas',
      precio: 300,
      embalaje: 20,
      esOferta: false,
      esRepresentacion: false,
      rutaImg: '310101.jpg'
    },
    {
      codigo: 310102,
      desc: '9 de oro agridulce x 200grs',
      marca: '9 de oro',
      rubro: 'Galletitas',
      precio: 300,
      embalaje: 20,
      esOferta: false,
      esRepresentacion: false,
      rutaImg: '310102.jpg'
    },
    {
      codigo: 310103,
      desc: '9 de oro azucarada x 200grs',
      marca: '9 de oro',
      rubro: 'Galletitas',
      precio: 300,
      embalaje: 20,
      esOferta: false,
      esRepresentacion: false,
      rutaImg: '310103.jpg'
    },
    {
      codigo: 311101,
      desc: 'Natura mayonesa x 250grs',
      marca: 'Natura',
      rubro: 'Aderezos',
      precio: 240,
      embalaje: 12,
      esOferta: false,
      esRepresentacion: false,
      rutaImg: '311101.jpg'
    },
    {
      codigo: 311102,
      desc: 'Natura salsa golf x 250grs',
      marca: 'Natura',
      rubro: 'Aderezos',
      precio: 260,
      embalaje: 12,
      esOferta: false,
      esRepresentacion: false,
      rutaImg: '311102.jpg'
    },
    {
      codigo: 311103,
      desc: 'Natura mostaza x 250grs',
      marca: 'Natura',
      rubro: 'Aderezos',
      precio: 310,
      embalaje: 12,
      esOferta: false,
      esRepresentacion: false,
      rutaImg: '311103.jpg'
    },
    {
      codigo: 530101,
      desc: 'Trimacer arroz "0000" x 500grs',
      marca: 'Trimacer',
      rubro: 'Arroz',
      precio: 90,
      embalaje: 10,
      esOferta: true,
      esRepresentacion: true,
      rutaImg: '530101.jpg'
    },
    {
      codigo: 530301,
      desc: 'Trimacer arroz "0000" x 1KG',
      marca: 'Trimacer',
      rubro: 'Arroz',
      precio: 190,
      embalaje: 10,
      esOferta: true,
      esRepresentacion: true,
      rutaImg: '530302.jpg'
    },
    {
      codigo: 530201,
      desc: 'Trimacer arroz integral x 500grs',
      marca: 'Trimacer',
      rubro: 'Arroz',
      precio: 320,
      embalaje: 10,
      esOferta: true,
      esRepresentacion: true,
      rutaImg: '530201.jpg'
    },
    {
      codigo: 30101,
      desc: 'Chacabuco harina comun x 1 kg',
      marca: 'Chacabuco',
      rubro: 'Harinas',
      precio: 160,
      embalaje: 10,
      esOferta: true,
      esRepresentacion: true,
      rutaImg: '30101.jpg'
    },
    {
      codigo: 30301,
      desc: 'Chacabuco harina leudante x 1 kg',
      marca: 'Chacabuco',
      rubro: 'Harinas',
      precio: 190,
      embalaje: 10,
      esOferta: true,
      esRepresentacion: true,
      rutaImg: '30301.jpg'
    },
    {
      codigo: 30201,
      desc: 'Chacabuco harina "0000" x 1 kg',
      marca: 'Chacabuco',
      rubro: 'Harinas',
      precio: 170,
      embalaje: 10,
      esOferta: true,
      esRepresentacion: true,
      rutaImg: '30201.jpg'
    },
    {
      codigo: 220101,
      desc: 'Crieky mani salado x 1kg',
      marca: 'Criskey',
      rubro: 'Copetin',
      precio: 340,
      embalaje: 10,
      esOferta: false,
      esRepresentacion: true,
      rutaImg: '220101.jpg'
    },
    {
      codigo: 220102,
      desc: 'Crieky puflitos x 1kg',
      marca: 'Criskey',
      rubro: 'Copetin',
      precio: 750,
      embalaje: 6,
      esOferta: false,
      esRepresentacion: true,
      rutaImg: '220102.jpg'
    },
    {
      codigo: 220103,
      desc: 'De La Huerta pure de tomate x 500grs',
      marca: 'Baggio',
      rubro: 'Conservas',
      precio: 260,
      embalaje: 12,
      esOferta: false,
      esRepresentacion: true,
      rutaImg: '220103.jpg'
    },
    {
      codigo: 220104,
      desc: 'De La Huerta pure de tomate x 180grs',
      marca: 'Baggio',
      rubro: 'Conservas',
      precio: 130,
      embalaje: 18,
      esOferta: false,
      esRepresentacion: true,
      rutaImg: '220104.jpg'
    },
    {
      codigo: 410101,
      desc: 'Ayudin lavandina x 1L',
      marca: 'Ayudin',
      rubro: 'Limpieza',
      precio: 230,
      embalaje: 15,
      esOferta: true,
      esRepresentacion: false,
      rutaImg: '410101.jpg'
    },
    {
      codigo: 410102,
      desc: 'Ayudin lavandina x 2L',
      marca: 'Ayudin',
      rubro: 'Limpieza',
      precio: 450,
      embalaje: 8,
      esOferta: true,
      esRepresentacion: false,
      rutaImg: '410102.jpg'
    },
    {
      codigo: 410103,
      desc: 'Dove antitranspirante x 150ml',
      marca: 'Dove',
      rubro: 'Perfumeria',
      precio: 330,
      embalaje: 12,
      esOferta: true,
      esRepresentacion: false,
      rutaImg: '410103.jpg'
    },
    {
      codigo: 410104,
      desc: 'Dove  rollon antitranspirante x110',
      marca: 'Dove',
      rubro: 'Perfumeria',
      precio: 300,
      embalaje: 12,
      esOferta: true,
      esRepresentacion: false,
      rutaImg: '410104.jpg'
    }
  ];

  let rubros = productos.reduce((allRubros, producto) => {
    return Array.from(new Set([...allRubros, producto.rubro]));
  }, []);

  res.render('carpeta', {
    title: 'Carpeta',
    nombre: req.session.nombre || undefined,
    admin: req.session.admin,
    vendedor: req.session.vendedor,
    productos,
    rubros
  });
});

module.exports = router;
