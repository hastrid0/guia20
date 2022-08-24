var express = require('express');
var router = express.Router();
var router = express.Router();

const myapp = 'guia20-94868'
const Sequelize = require('sequelize');
const Producto = require('../models').producto;

router.get('/reporte', function (req, res, next) {
    Producto.findAll({
      attributes: { exclude: ["updatedAt"] }
    })
      .then(productos => {
        res.json(productos);
      })
      .catch(error => res.status(400).send(error))
    
  });
  /* GET one. */
router.get('/:nombre', (req, res, next) => {
  
  const nme = req.params.nombre;
  axios.get(`https://${myapp}-default-rtdb.firebaseio.com/movies/${nme}.json`)
  .then( resAxios => {
      res.json(resAxios.data)
  })
  .catch(err => console.log(err))

});
  router.get('/reporte/:nombre', function (req, res, next) {
    let id = parseInt(req.params.id)
    Producto.findOne({
      where :{
        [Sequelize.Op.and]:[
          {id : id}
        ]
      }
      
    })
      .then(productos => {
        res.json(productos);
      })
      .catch(error => res.status(400).send(error))
    
  });

  
  module.exports = router;
  