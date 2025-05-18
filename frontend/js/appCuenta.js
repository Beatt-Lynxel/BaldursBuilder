console.log(document.cookie);
const rutaServidor = "https://baldursbuilder.onrender.com";

document.getElementById('boton-cambio-contrasenia').addEventListener('click', (event) => {
    event.preventDefault();
    // Obtiene los valores de los campos
    const contrasenia = document.querySelector('#contrasenia').value;
    const nuevaContrasenia = document.getElementById('nuevaContrasenia').value;
    const confirmarContrasenia = document.getElementById('confirmarContrasenia').value;
    // obtenemos el id de la cookie
    const id = obtenerID("session_token");
    
    // Validaciones
    if (!confirmarContrasenia || !nuevaContrasenia || !contrasenia) {
        mostrarModalMensaje('Error', 'Los campos no pueden estar vacíos.');
        return;
    }

    if (!validarContrasenia(nuevaContrasenia)) {
        mostrarModalMensaje('Error', 'La contraseña debe tener al menos 9 caracteres, incluyendo una minúscula, una mayúscula, un número y un carácter especial.');
        return;
    }

    if (!validarConfirmarContrasenia(nuevaContrasenia, confirmarContrasenia)) {
        mostrarModalMensaje('Error', 'Las contraseñas no coinciden.');
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
            mostrarModalMensaje('Éxito', `Se ha cambiado la contraseña correctamente.`);
        })
        .catch((error) => {
            mostrarModalMensaje('Error al cambiar contraseña');
        });
});

['nuevaContrasenia', 'contrasenia', 'confirmarContrasenia'].forEach(id => {
    document.getElementById(id).addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            event.target.blur(); // Quita el foco del campo que disparó el evento
            document.getElementById('boton-cambio-contrasenia').click();
        }
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
        mostrarModalMensaje('Error', 'Debes introducir la contraseña.');
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
            mostrarModalMensaje('Éxito', `Se ha borrado la cuenta correctamente.`);
            eliminarCookie("session_token");
            setTimeout(() => {
                window.location.href = '../index.html';
            }, 1500);
        })
        .catch((error) => {
            console.log("error: " + error);
            let mensaje = 'No fue posible llevar a cabo la accion.';
            try {
                const parsed = JSON.parse(error.message.replace(/^Error: /, ''));
                if (parsed.error) {
                    mensaje = parsed.error;
                }
            } catch (e) {
            }
            mostrarModalMensaje('Error al borrar la cuenta', mensaje);
        });
});


// Función para enviar la petición de cambio de contraseña envuelta en una promesa
function cambiarContrasenia(datos) {
    return new Promise((resolve, reject) => {
        const peticion = new XMLHttpRequest();
        peticion.open('POST', rutaServidor + '/users/cambioContrasenia');
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
        peticion.open('POST', rutaServidor + '/users/borrarUser');
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
                try {
                    const errorObj = JSON.parse(peticion.responseText);
                    reject(new Error(errorObj.error || 'Error al borrar la cuenta.'));
                } catch (e) {
                    reject(new Error('Error al borrar la cuenta.'));
                }
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

function mostrarModalMensaje(titulo, mensaje, onConfirm = null) {
    // Si ya existe una, la borramos primero
    const anterior = document.getElementById("modal-mensaje");
    if (anterior) anterior.remove();

    const modal = document.createElement("div");
    modal.id = "modal-mensaje";
    modal.classList.add("modal-background");

    const modalContent = document.createElement("div");
    modalContent.classList.add("modal-content");

    const contenedorMensaje = document.createElement("div");
    contenedorMensaje.classList.add("contenedor-mensajes")

    const h2 = document.createElement("h2");
    h2.textContent = titulo;

    const p = document.createElement("p");

    if (titulo == "Error") {
        try {
            const parsed = JSON.parse(mensaje);
            if (parsed && parsed.error) {
                p.textContent = parsed.error;
            } else {
                p.textContent = mensaje;
            }
        } catch (e) {
            // Si no es JSON válido, se usa directamente como texto
            p.textContent = mensaje;
        }
    } else {
        p.textContent = mensaje;
    }

    contenedorMensaje.appendChild(h2);
    contenedorMensaje.appendChild(p);

    if (titulo === "Confirmación" && typeof onConfirm === "function") {
        const botonAceptar = document.createElement("button");
        botonAceptar.textContent = "Aceptar";
        botonAceptar.classList.add("boton-superior");
        botonAceptar.addEventListener("click", () => {
            modal.remove();
            onConfirm(); // Ejecuta la acción confirmada
        });

        const botonCancelar = document.createElement("button");
        botonCancelar.textContent = "Cancelar";
        botonCancelar.classList.add("boton-superior");
        botonCancelar.addEventListener("click", () => modal.remove());

        contenedorMensaje.appendChild(botonAceptar);
        contenedorMensaje.appendChild(botonCancelar);
    } else {
        const boton = document.createElement("button");
        boton.textContent = "Aceptar";
        boton.classList.add("boton-superior");
        boton.addEventListener("click", () => modal.remove());
        contenedorMensaje.appendChild(boton);
    }

    modalContent.appendChild(contenedorMensaje);
    modal.appendChild(modalContent);
    document.body.appendChild(modal);

    modal.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
} // modal mensajes

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