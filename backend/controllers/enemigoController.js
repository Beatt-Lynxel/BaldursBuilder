const Enemigo = require('../models/enemigo');
const db = require('../config/db');

// Una la funcion para obtener todas las enemigos
const obtenerEnemigos = async (req, res) => {
    try {
        const [enemigos] = await db.query('SELECT * FROM enemigos');
        res.status(200).json(enemigos);
    } catch (error) {
        res.status(500).json({ error: `Error al obtener las enemigos, motivo: ${error}` });
    }
};

// exportamos las funciones
module.exports = {
    obtenerEnemigos
}