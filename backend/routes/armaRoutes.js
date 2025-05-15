const express = require('express');

const routerArma = express.Router();
// llamamos al controlador del producto
const armasController = require('../controllers/armaController');

// Rutas
routerArma.get('/', armasController.obtenerArmas);

module.exports = routerArma;