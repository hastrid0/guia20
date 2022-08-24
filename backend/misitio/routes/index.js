var express = require('express');
var router = express.Router();

//referencia a modulos
const Sequelize = require('sequelize');
const Producto = require('../models').producto;

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/reporte', function (req, res, next) {
  Producto.findAll({
    attributes: { exclude: ["updatedAt"] }
  })
    .then(productos => {
      res.render('productos', { title: 'My Dashboard :: Productos', arrProductos: productos });
    })
    .catch(error => res.status(400).send(error))

});

router.get('/productos/:id', function (req, res, next) {
  let id = parseInt(req.query.id)
  Producto.findAll({
    where:{
      id:{
        [Sequelize.Op.and]:[id]
      }
    }
  })
    .then(productos => {
      res.json(productos);
    })
    .catch(error => res.status(400).send(error))

});



module.exports = router;
