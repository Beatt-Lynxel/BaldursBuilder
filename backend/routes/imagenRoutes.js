const express = require("express");
const multer = require("multer");
const imagenesController = require("../controllers/imagenController");

const router = express.Router();

// Usamos memoria como almacenamiento temporal
const almacenamiento = multer.memoryStorage();
const subidaImagen = multer({ storage: almacenamiento });

router.delete("/borrar-imagen", imagenesController.borrarImagenBuild);
router.post("/guardar-imagen", subidaImagen.single("imagen"), imagenesController.guardarImagenBuild);

module.exports = router;