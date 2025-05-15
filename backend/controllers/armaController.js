const Arma = require('../models/arma');
const db = require('../config/db');

// Una la funcion para obtener todas las armas
const obtenerArmas = async (req, res) => {
    try {
        const [armas] = await db.query('SELECT * FROM armas');
        res.status(200).json(armas);
    } catch (error) {
        res.status(500).json({ error: `Error al obtener las armas, motivo: ${error}` });
    }
};

// exportamos las funciones
module.exports = {
    obtenerArmas
}