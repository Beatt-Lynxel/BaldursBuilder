console.log(document.cookie);

document.getElementById('boton-cambio-contraseña').addEventListener('click', (event) => {
    event.preventDefault();
    // Obtiene los valores de los campos
    const contrasenia = document.querySelector('#contrasenia').value;
    const nuevaContrasenia = document.getElementById('nuevaContrasenia').value;
    const confirmarContrasenia = document.getElementById('confirmarContrasenia').value;
    // obtenemos el id de la cookie
    const id = obtenerID("session_token");
    
    // Validaciones
    if (!confirmarContrasenia || !nuevaContrasenia || !contrasenia) {
        mostrarModal('Error', 'Los campos no pueden estar vacíos.');
        return;
    }

    if (!validarContrasenia(nuevaContrasenia)) {
        mostrarModal('Error', 'La contraseña debe tener al menos 9 caracteres, incluyendo una minúscula, una mayúscula, un número y un carácter especial.');
        return;
    }

    if (!validarConfirmarContrasenia(nuevaContrasenia, confirmarContrasenia)) {
        mostrarModal('Error', 'Las contraseñas no coinciden.');
        return;
    }
    // Crea el objeto para el nuevo usuario
    const datosCambio = {
        id,
        contrasenia,
        nuevaContrasenia
    };
    cambiarContrasenia(datosCambio)
        .then((respuesta) => {
            // Mostramos un mensaje de éxito 2 segundos y redirigimos a index
            mostrarModal('Éxito', `Se ha cambiado la contraseña correctamente.`);
        })
        .catch((error) => {
            mostrarModal('Error', error.message || 'Error al cambiar contraseña');
        });
});

document.getElementById('boton-borrar').addEventListener('click', (event) => {
    event.preventDefault();
    // Obtiene los valores de los campos
    const contrasenia = document.querySelector('#contrasenia').value;
    // obtenemos el id de la cookie
    const id = obtenerID("session_token");
    
    // Validaciones
    if (!contrasenia) {
        mostrarModal('Error', 'Debes introducir la contraseña.');
        return;
    }

    // Crea el objeto para el borrado de usuario
    const datosBorrar = {
        id,
        contrasenia
    };
    // Realiza la petición HTTP usando promesa
    borrarCuenta(datosBorrar)
        .then((respuesta) => {
            // Mostramos un mensaje de éxito 2 segundos y redirigimos a index
            mostrarModal('Éxito', `Se ha borrado la cuenta correctamente.`);
            eliminarCookie("session_token");
            setTimeout(() => {
                window.location.href = '../index.html';
            }, 2000);
        })
        .catch((error) => {
            console.log("error: " + error);
            console.log("error.mensaje: " + error.message);
            
            mostrarModal('Error', error.message || 'Error al borrar la cuenta.');
        });
});

// Función para enviar la petición de cambio de contraseña envuelta en una promesa
function cambiarContrasenia(datos) {
    return new Promise((resolve, reject) => {
        const peticion = new XMLHttpRequest();
        peticion.open('POST', 'http://localhost:4000/users/cambioContrasenia');
        peticion.setRequestHeader('Content-Type', 'application/json');
        peticion.send(JSON.stringify(datos));

        // Manejamos la respuesta
        peticion.addEventListener("load", function () {
            if (peticion.status >= 200 && peticion.status < 300) {
                try {
                    const respuesta = JSON.parse(peticion.responseText);
                    resolve(respuesta);
                } catch (error) {
                    reject(new Error('Error al procesar la respuesta: ' + error));
                }
            } else {
                reject(new Error(`Error al cambiar la contraseña: ${peticion.responseText}`));
            }
        });

        peticion.addEventListener("error", function () {
            reject(new Error('No se pudo completar la solicitud. Por favor, intenta más tarde.'));
        });
    });
}

// Función para enviar la petición de cambio de contraseña envuelta en una promesa
function borrarCuenta(datos) {
    return new Promise((resolve, reject) => {
        const peticion = new XMLHttpRequest();
        peticion.open('POST', 'http://localhost:4000/users/borrarUser');
        peticion.setRequestHeader('Content-Type', 'application/json');
        peticion.send(JSON.stringify(datos));

        // Manejamos la respuesta
        peticion.addEventListener("load", function () {
            if (peticion.status >= 200 && peticion.status < 300) {
                try {
                    const respuesta = JSON.parse(peticion.responseText);
                    resolve(respuesta);
                } catch (error) {
                    reject(new Error('Error al procesar la respuesta: ' + error));
                }
            } else {
                reject(new Error(`Error al borrar cuenta: ${peticion.responseText}`));
            }
        });

        peticion.addEventListener("error", function () {
            reject(new Error('No se pudo completar la solicitud. Por favor, intenta más tarde.'));
        });
    });
}

function obtenerID(nombreCookie) {
    //obtenemos el listado de cookies
    let idUser = 0;
    const cookies = document.cookie.split("; ");
    // con un foreach
    cookies.forEach(cookie => {
        const [nombre] = cookie.split("="); // Divide en nombre y valor
        if (nombre === nombreCookie) {
            const [sesion] = cookie.split("; ");
            idUser = sesion.split("=")[1];
        }
    });
    return idUser;
}

function mostrarModal(titulo, mensaje) {
    const ventanaModal = document.createElement('div');
    ventanaModal.style.position = 'fixed';
    ventanaModal.style.top = '0';
    ventanaModal.style.left = '0';
    ventanaModal.style.width = '100%';
    ventanaModal.style.height = '100%';
    ventanaModal.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    ventanaModal.style.display = 'flex';
    ventanaModal.style.justifyContent = 'center';
    ventanaModal.style.alignItems = 'center';
    ventanaModal.style.zIndex = '1000';

    const contenidoModal = document.createElement('div');
    contenidoModal.style.backgroundColor = 'black';
    contenidoModal.style.padding = '20px';
    contenidoModal.style.borderRadius = '8px';
    contenidoModal.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
    contenidoModal.style.textAlign = 'center';

    const tituloModal = document.createElement('h2');
    tituloModal.textContent = titulo;

    const mensajeModal = document.createElement('p');
    mensajeModal.textContent = mensaje;

    const botonCerrar = document.createElement('button');
    botonCerrar.textContent = 'Cerrar';
    botonCerrar.style.marginTop = '10px';
    botonCerrar.style.padding = '10px 20px';
    botonCerrar.style.border = 'none';
    botonCerrar.style.backgroundColor = '#007BFF';
    botonCerrar.style.color = 'white';
    botonCerrar.style.borderRadius = '4px';
    botonCerrar.style.cursor = 'pointer';

    botonCerrar.addEventListener('click', () => {
        document.body.removeChild(ventanaModal);
    });

    contenidoModal.appendChild(tituloModal);
    contenidoModal.appendChild(mensajeModal);
    contenidoModal.appendChild(botonCerrar);
    ventanaModal.appendChild(contenidoModal);
    document.body.appendChild(ventanaModal);
}

function validarContrasenia(contrasenia) {
    const regex = /^(?=.*[a-zñ])(?=.*[A-ZÑ])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-zñÑ\d!@#$%^&*(),.?":{}|<>]{9,}$/;
    return regex.test(contrasenia);
}

function validarConfirmarContrasenia(contrasenia, confirmarContrasenia) {
    if (contrasenia === confirmarContrasenia) {
        return true;
    } else {
        return false;
    }
}

function eliminarCookie(nombreCookie) {
    //obtenemos el listado de cookies
    const cookies = document.cookie.split("; ");
    // con un foreach
    cookies.forEach(cookie => {
        const [nombre] = cookie.split("="); // Divide en nombre y valor
        if (nombre === nombreCookie) {
            document.cookie = nombre + "=; path=/; max-age=0; SameSite=Lax";
        }
    });
}

window.addEventListener("DOMContentLoaded", () => {
    console.log("DOM Cargado");
});