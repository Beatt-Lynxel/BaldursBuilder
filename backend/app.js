// importamos los modulos requeridos:
//el archivo de configuracion
require("dotenv").config();
// framework para crear apps web y APIs
const express = require('express');
// middleware que maneja solicitudes CORS (Cross-Origin Resurce Sharing) para poder 
// permitir o restringir el acceso a tu API desde otros dominios.
const cors = require('cors');
// ruta
const path = require('path');


//Importamos las rutas
const userRouter = require('./routes/userRoutes');
const buildsRouter = require('./routes/buildRoutes');
const armasRouter = require('./routes/armaRoutes');
const armadurasRouter = require('./routes/armaduraRoutes');
const accesoriosRouter = require('./routes/accesorioRoutes');
const enemigosRouter = require('./routes/enemigoRoutes');
const imagenRouter = require('./routes/imagenRoutes')

// creamos la app
const app = express();
// hacemos que use las librerias de cors
app.use(cors());
// hacemos que use express para que parsee los cuerpos de las solicitudes en JSON
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
//distintas rutas a usar:
// raiz, se suele usar para el index
app.get('/', (req, res) => {
    res.send("Prueba correcta")
});
// esto hace que cuando pongamos  /users va a buscarlo a routerUsuario
app.use('/users', userRouter); 
// esto hace que cuando pongamos  /armas va a buscarlo a routerBuilds
app.use('/builds', buildsRouter);
// esto hace que cuando pongamos  /armaduras va a buscarlo a routerArmas
app.use('/armas', armasRouter);
// esto hace que cuando pongamos  /accesorios va a buscarlo a routerArmaduras
app.use('/armaduras', armadurasRouter);
// esto hace que cuando pongamos  /builds va a buscarlo a routerAccesorios
app.use('/accesorios', accesoriosRouter);
// esto hace que cuando pongamos  /enemigos va a buscarlo a routerEnemigos
app.use('/enemigos', enemigosRouter);

app.use('/imagenes', imagenRouter);

// declaramos un numero de puerto
const puerto = 4000;
// hacemos que nuestra app escuche un puerto determinado
const server = app.listen(puerto, () => {
    console.log(`Servidor a la escucha en puerto ${puerto}`);
});