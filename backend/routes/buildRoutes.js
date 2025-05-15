const express = require('express');

const routerBuild = express.Router();
// Llamamos al controlador de builds
const buildsController = require('../controllers/buildController');

// Rutas
routerBuild.get('/misBuilds', buildsController.obtenerBuildsUsuario);
routerBuild.get('/publicas', buildsController.obtenerBuildsPublicas);
routerBuild.get('/:id', buildsController.obtenerBuildPorId);
routerBuild.post('/crear', buildsController.crearBuild);
routerBuild.post('/editar', buildsController.editarBuild);
routerBuild.post('/ocultar', buildsController.ocultarBuild);
routerBuild.delete('/borrar', buildsController.borrarBuild);

module.exports = routerBuild;