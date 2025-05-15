const express = require('express');

const routerUsuario = express.Router();
// llamamos al controlador del producto
const usuariosController = require('../controllers/userController');

// Rutas
routerUsuario.post('/register', usuariosController.registrarse);
routerUsuario.post('/login', usuariosController.conectarse);
routerUsuario.post('/cambioContrasenia', usuariosController.cambiarContrasenia);
routerUsuario.post('/borrarUser', usuariosController.borrarUsuario);
routerUsuario.post('/obtenerRol', usuariosController.obtenerRolUsuario);


module.exports = routerUsuario;