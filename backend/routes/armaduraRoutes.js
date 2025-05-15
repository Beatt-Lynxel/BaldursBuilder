const express = require('express');

const routerArmadura = express.Router();
// llamamos al controlador del producto
const armadurasController = require('../controllers/armaduraController');

// Rutas
routerArmadura.get('/', armadurasController.obtenerArmaduras);

module.exports = routerArmadura;