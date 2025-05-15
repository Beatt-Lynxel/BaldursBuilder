const User = require('../models/user');
const db = require('../config/db');
// modulo bcrypt para hashear contraseñas de nodejs
const bcrypt = require('bcrypt');
// CRUD
// Crear un usuario (CREATE)
const registrarse = async (req, res) => {
    const { email, contrasenia } = req.body;
    // Hashear la contraseña
    // un salt es un fragmento que se usará para generar el hash asociado
    // a la contraseña, cuantos más mas seguro pero mas consumirá el servidor
    // para realizar la encriptacion
    const salts = 10;
    const contraseniaHasheada = await bcrypt.hash(contrasenia, salts);
    try {
        // Verificar si el email ya existe en la base de datos
        const [usuarioExistente] = await db.query('SELECT * FROM usuarios WHERE email = ?', [email]);
        if (usuarioExistente.length > 0) {
            // Obnenemos el usuario para comprobar si está activo
            const usuarioActivo = usuarioExistente[0];
            if (usuarioActivo.activo === 1) {
                // si está activo evitamos que se registre nuevamente ese email
                return res.status(400).json({ error: 'Ese email ya está registrado.' });
            } else {
                // o reactivamos el usuario si estaba desactivado
                await db.query(
                    'UPDATE usuarios SET password = ?, activo = 1 WHERE email = ?',
                    [contraseniaHasheada, email]
                );
                return res.status(200).json({ id: usuarioActivo.id, email });
            }
        }
        const [resultado] = await db.query(
            'INSERT INTO usuarios (email, password, rol, activo) VALUES (?, ?, 1, 1)',
            [email, contraseniaHasheada]
        );
        res.status(201).json({ id: resultado.insertId, email });
    } catch (error) {
        console.error("Error al registrarse:", error);
        res.status(500).json({ error: `Error al registrarse, motivo: ${error}` });
    }
};

// Conectarse con email y contraseña (READ)
const conectarse = async (req, res) => {
    const { email, contrasenia } = req.body;
    
    try {
        // Recuperar el usuario con el email proporcionado
        const [resultado] = await db.query(
            'SELECT * FROM usuarios WHERE email = ?',
            [email]
        );

        if (resultado.length === 0) {
            return res.status(404).json({ error: "Email o contraseña incorrectos." });
        }

        const usuario = resultado[0];

        if (usuario.activo === 0) {
            return res.status(403).json({ error: "La cuenta está desactivada, reactivela en registro." });
        }

        // Comparar la contraseña ingresada con la almacenada
        const esValida = await bcrypt.compare(contrasenia, resultado[0].password);
        if (!esValida) {
            return res.status(404).json({ error: "Email o contraseña incorrectos." });
        }

        // Si es válida, devolver el id del usuario
        res.status(200).json({ id: resultado[0].id });
    } catch (error) {
        console.error("Error al conectarse:", error);
        res.status(500).json({ error: `Error al conectarse, motivo: ${error}` });
    }
};

// Cambiar contraseña (UPDATE)
const cambiarContrasenia = async (req, res) => {
    const { id, contrasenia, nuevaContrasenia } = req.body;
    // En este caso se hasean la contraseña para comprobar que es la misma que la almacenada
    // Y la nueva para que se almacene hasheada
    const salts = 10;
    const nuevaContraseniaHaseada = await bcrypt.hash(nuevaContrasenia, salts);
    try {
        // Recuperar el usuario con el id proporcionado
        const [usuarioRecuperado] = await db.query(
            'SELECT * FROM usuarios WHERE id = ?',
            [id]
        );
        if (usuarioRecuperado.length === 0) {
            return res.status(404).json({ error: "No existe el usuario." });
        }

        // Comparar la contraseña ingresada con la almacenada
        const esValida = await bcrypt.compare(contrasenia, usuarioRecuperado[0].password);
        if (!esValida) {
            return res.status(404).json({ error: "Contraseña incorrecta." });
        }
        const [cambiaContrasenia] = await db.query(
            'UPDATE usuarios SET password = ? WHERE id = ?',
            [nuevaContraseniaHaseada, id]
        );
        if (cambiaContrasenia.affectedRows === 0) {
            return res.status(404).json({ error: "Error al cambiar la contraseña." });
        }
        res.status(200).json({ message: "Contraseña actualizada correctamente." });
    } catch (error) {
        console.error("Error al cambiar la contraseña:", error);
        res.status(500).json({ error: `Error al cambiar la contraseña, motivo: ${error}` });
    }
};

// Borrar un usuario por ID (DELETE)
const borrarUsuario = async (req, res) => {
    const { id, contrasenia } = req.body;
    try {
        // Recuperar el usuario con el id proporcionado
        const [usuarioRecuperado] = await db.query(
            'SELECT * FROM usuarios WHERE id = ?',
            [id]
        );
        if (usuarioRecuperado.length === 0) {
            return res.status(404).json({ error: "No existe el usuario." });
        }

        const usuario = usuarioRecuperado[0];

        if (usuario.rol === 2) {
            return res.status(403).json({ error: "No puedes desactivar esta cuenta." });
        }

        // Comparar la contraseña ingresada con la almacenada
        const esValida = await bcrypt.compare(contrasenia, usuarioRecuperado[0].password);
        if (!esValida) {
            return res.status(404).json({ error: "Contraseña incorrecta." });
        }
        // Desactivamos el usuario en lugar de borrarlo
        const [resultado] = await db.query(
            'UPDATE usuarios SET activo = 0 WHERE id = ?',
            [id]
        );
        if (resultado.affectedRows === 0) {
            return res.status(404).json({ error: 'Usuario no encontrado.' });
        }
        res.status(200).json({ message: "Usuario eliminado correctamente." });
    } catch (error) {
        console.error("Error al borrar usuario:", error);
        res.status(500).json({ error: `Error al borrar usuario, motivo: ${error}` });
    }
};

// obtener el rol del usuario 1 para normal 2 para admin (READ)
const obtenerRolUsuario = async (req, res) => {
    const { id } = req.body;
    
    try {
        // Recuperar el usuario con el email proporcionado
        const [resultado] = await db.query(
            'SELECT * FROM usuarios WHERE id = ?',
            [id]
        );

        if (resultado.length === 0) {
            return res.status(404).json({ error: "No existe el usuario." });
        }

        const usuario = resultado[0];

        if (usuario.activo === 0) {
            return res.status(403).json({ error: "La cuenta está desactivada, reactivela en registro." });
        }

        // Si es válida, devolver el id del usuario
        res.status(200).json({ rol: resultado[0].rol });
    } catch (error) {
        console.error("Error al conectarse:", error);
        res.status(500).json({ error: `Error al conectarse, motivo: ${error}` });
    }
};

module.exports = {
    registrarse,
    conectarse,
    cambiarContrasenia,
    borrarUsuario,
    obtenerRolUsuario
};