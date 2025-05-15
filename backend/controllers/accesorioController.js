const Accesorio = require('../models/accesorio');
const db = require('../config/db');

// Una la funcion para obtener todas las armas
const obtenerAccesorios = async (req, res) => {
    try {
        const [accesorios] = await db.query('SELECT * FROM accesorios');
        res.status(200).json(accesorios);
    } catch (error) {
        res.status(500).json({ error: `Error al obtener las accesorios, motivo: ${error}` });
    }
};

// exportamos las funciones
module.exports = {
    obtenerAccesorios
}