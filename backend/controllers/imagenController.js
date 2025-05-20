const sharp = require("sharp");
const path = require("path");
const fs = require("fs");
const db = require("../config/db");

const guardarImagenBuild = async (req, res) => {
    try {
        const buildId = req.body.build_id;
        if (!buildId || isNaN(buildId)) {
            return res.status(400).json({ error: "ID de build inválido o ausente" });
        }

        const outputDir = path.join(__dirname, "../uploads/builds");
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }

        const nombreArchivo = `build-${buildId}.png`;
        const rutaSalida = path.join(outputDir, nombreArchivo);

        await sharp(req.file.buffer)
            .resize(350, 350)
            .png()
            .toFile(rutaSalida);

        await db.query('UPDATE builds SET imagen = 1 WHERE id = ?', [buildId]);

        res.status(200).json({ mensaje: "Imagen guardada", archivo: nombreArchivo });
    } catch (error) {
        console.error("Error al guardar imagen:", error);
        res.status(500).json({ error: "Error al guardar la imagen" });
    }
};

const borrarImagenBuild = async (req, res) => {
    try {
        const buildId = req.query.build_id;
        if (!buildId || isNaN(buildId)) {
            return res.status(400).json({ error: "ID de build inválido o ausente" });
        }

        const nombreArchivo = `build-${buildId}.png`;
        const rutaImagen = path.join(__dirname, "../uploads/builds/", nombreArchivo);

        if (fs.existsSync(rutaImagen)) {
            fs.unlinkSync(rutaImagen);
            await db.query("UPDATE builds SET imagen = 0 WHERE id = ?", [buildId]);
            res.status(200).json({ mensaje: "Imagen eliminada correctamente." });
        } else {
            res.status(404).json({ error: "La imagen no existe." });
        }
    } catch (error) {
        console.error("Error al borrar la imagen:", error);
        res.status(500).json({ error: "Error al borrar la imagen." });
    }
};

module.exports = {
    guardarImagenBuild,
    borrarImagenBuild
};
