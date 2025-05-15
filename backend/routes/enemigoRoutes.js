const express = require('express');

const routerEnemigo = express.Router();
// llamamos al controlador del producto
const enemigosController = require('../controllers/enemigoController');

// Rutas
routerEnemigo.get('/', enemigosController.obtenerEnemigos);

module.exports = routerEnemigo;