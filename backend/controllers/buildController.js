const User = require('../models/user');
const Build = require('../models/build');
const db = require('../config/db');

//funcion controladora de los las builds

// CRUD

// Una la funcion para obtener todas las builds del usuario que está conectado
const obtenerBuildsUsuario = async (req, res) => {
    const token = req.query.token;

    if (!token) return res.status(400).json({ error: 'Token no proporcionado' });

    try {
        // Acá asumimos que el token es el ID del usuario, tal cual
        const user_id = parseInt(token);
        if (isNaN(user_id)) return res.status(400).json({ error: 'Token inválido' });

        const [builds] = await db.query(
            'SELECT * FROM builds WHERE user_id = ?',
            [user_id]
        );

        res.status(200).json(builds);
    } catch (error) {
        res.status(500).json({ error: `Error al obtener las builds, motivo: ${error}` });
    }
};

// Una la funcion para obtener una build en especifico
const obtenerBuildPorId = async (req, res) => {
    const buildId = parseInt(req.params.id);
    if (isNaN(buildId)) return res.status(400).json({ error: 'ID inválido' });

    try {
        const [resultados] = await db.query(
            'SELECT * FROM builds WHERE id = ?',
            [buildId]
        );

        if (resultados.length === 0) {
            return res.status(404).json({ error: 'Build no encontrada' });
        }

        res.status(200).json(resultados[0]);
    } catch (error) {
        res.status(500).json({ error: `Error al obtener la build, motivo: ${error}` });
    }
};

// Una la funcion para obtener las builds publicas
const obtenerBuildsPublicas = async (req, res) => {
    const token = req.query.token;

    if (!token) return res.status(400).json({ error: 'Token no proporcionado' });

    try {
        // Acá asumimos que el token es el ID del usuario, tal cual
        const user_id = parseInt(token);
        if (isNaN(user_id)) return res.status(400).json({ error: 'Token inválido' });

        const [builds] = await db.query(
            'SELECT * FROM builds WHERE publica = 1 AND user_id != ?',
            [user_id]
        );

        res.status(200).json(builds);
    } catch (error) {
        res.status(500).json({ error: `Error al obtener las builds, motivo: ${error}` });
    }
};




// Crear una nueva build
const crearBuild = async (req, res) => {
    const {
        user_id,
        nombre,
        nombre_pj,
        raza_id = 1,
        clase_id = 1,
        historia = "",
        fuerza = 8,
        destreza = 8,
        constitucion = 8,
        inteligencia = 8,
        sabiduria = 8,
        carisma = 8,
        bonus1 = null,
        bonus2 = null,
        arma = null,
        armadura = null,
        accesorio1 = null,
        accesorio2 = null,
        imagen = 0,
        publica = 0
    } = req.body;

    if (!nombre || !nombre_pj) {
        return res.status(400).json({ error: "Los campos 'nombre' y 'nombre_pj' son obligatorios." });
    }

    try {
        const [existe] = await db.query(
            `SELECT id FROM builds WHERE user_id = ? AND nombre = ?`,
            [user_id, nombre]
        );

        if (existe.length > 0) {
            return res.status(400).json({ error: "Ya tienes una build con ese nombre." });
        }
        const [resultado] = await db.query(
            `INSERT INTO builds 
            (user_id, nombre, nombre_pj, raza_id, clase_id, historia, 
            fuerza, destreza, constitucion, inteligencia, sabiduria, carisma, 
            bonus1, bonus2, arma, armadura, accesorio1, accesorio2, imagen, publica)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [user_id, nombre, nombre_pj, raza_id, clase_id, historia, 
             fuerza, destreza, constitucion, inteligencia, sabiduria, carisma,
             bonus1, bonus2, arma, armadura, accesorio1, accesorio2, imagen, publica]
        );

        res.status(200).json({ 
            mensaje: "Build creada correctamente.", 
            build_id: resultado.insertId 
        });
    } catch (error) {
        res.status(500).json({ error: `Error al crear la build, motivo: ${error}` });
    }
};

// Editar una build
const editarBuild = async (req, res) => {
    const {
        user_id,
        nombre,
        nombre_pj,
        raza_id = 1,
        clase_id = 1,
        historia = "",
        fuerza = 8,
        destreza = 8,
        constitucion = 8,
        inteligencia = 8,
        sabiduria = 8,
        carisma = 8,
        bonus1 = null,
        bonus2 = null,
        arma = null,
        armadura = null,
        accesorio1 = null,
        accesorio2 = null,
        imagen = 0,
        publica = 0
    } = req.body;

    if (!nombre || !nombre_pj) {
        return res.status(400).json({ error: "Los campos 'nombre' y 'nombre_pj' son obligatorios." });
    }

    try {
        const [existe] = await db.query(
            `SELECT id FROM builds WHERE user_id = ? AND nombre = ?`,
            [user_id, nombre]
        );

        if (existe.length === 0) {
            return res.status(404).json({ error: "No tienes una build con ese nombre, créala" });
        }
        
        await db.query(
            `UPDATE builds SET 
                nombre_pj = ?, raza_id = ?, clase_id = ?, historia = ?, 
                fuerza = ?, destreza = ?, constitucion = ?, inteligencia = ?, sabiduria = ?, carisma = ?, 
                bonus1 = ?, bonus2 = ?, arma = ?, armadura = ?, accesorio1 = ?, accesorio2 = ?,  imagen = ?, PUBLICA = ?
             WHERE user_id = ? AND nombre = ?`,
            [nombre_pj, raza_id, clase_id, historia,
             fuerza, destreza, constitucion, inteligencia, sabiduria, carisma,
             bonus1, bonus2, arma, armadura, accesorio1, accesorio2, imagen, publica,
             user_id, nombre]
        );

        res.status(200).json({ mensaje: "Build editada correctamente." });
    } catch (error) {
        res.status(500).json({ error: `Error al editar la build, motivo: ${error}` });
    }
};

// Ocultar una build
const ocultarBuild = async (req, res) => {
    const { id } = req.body;

    try {
        const [existe] = await db.query(
            `SELECT * FROM builds WHERE id = ?`,
            [id]
        );

        if (existe.length === 0) {
            return res.status(404).json({ error: "No existe esa build build" });
        }
        
        await db.query(`UPDATE builds SET PUBLICA = 0 WHERE id = ?`, [id]);

        res.status(200).json({ mensaje: "Build ocultada correctamente." });
    } catch (error) {
        res.status(500).json({ error: `Error al ocultar la build, motivo: ${error}` });
    }
};

// Borrar una build por ID (verificando que sea del usuario conectado)
const borrarBuild = async (req, res) => {
    const { id } = req.body;

    if (!id) {
        return res.status(400).json({ error: "ID de build no proporcionado." });
    }

    try {
        const [resultado] = await db.query(
            'DELETE FROM builds WHERE id = ?',
            [id]
        );

        if (resultado.affectedRows === 0) {
            return res.status(404).json({ error: 'Build no encontrada o no pertenece al usuario.' });
        }

        res.status(200).json({ mensaje: 'Build eliminada correctamente', id });
    } catch (error) {
        res.status(500).json({ error: 'Error al borrar la build', motivo: `${error}` });
    }
};
    
// exportamos las funciones
module.exports = {
    obtenerBuildsUsuario,
    obtenerBuildPorId,
    obtenerBuildsPublicas,
    crearBuild,
    editarBuild,
    ocultarBuild,
    borrarBuild
}