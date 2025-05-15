const Armadura = require('../models/armadura');
const db = require('../config/db');

// Una la funcion para obtener todas las armas
const obtenerArmaduras = async (req, res) => {
    try {
        const [armaduras] = await db.query('SELECT * FROM armaduras');
        res.status(200).json(armaduras);
    } catch (error) {
        res.status(500).json({ error: `Error al obtener las armaduras, motivo: ${error}` });
    }
};

// exportamos las funciones
module.exports = {
    obtenerArmaduras
}