const express = require('express');

const routerAccesorio = express.Router();
// llamamos al controlador del producto
const accesoriosController = require('../controllers/accesorioController');

// Rutas
routerAccesorio.get('/', accesoriosController.obtenerAccesorios);

module.exports = routerAccesorio;