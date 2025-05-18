console.log("Cookies actuales:", document.cookie);
const rutaServidor = "https://baldursbuilder.onrender.com";

document.getElementById('boton-login').addEventListener('click', (event) => {
    event.preventDefault();
    // Obtiene los valores de los campos
    const email = document.querySelector('#email').value;
    const contrasenia = document.getElementById('contrasenia').value;

    // Validaciones
    if (!email || !contrasenia) {
        mostrarModalMensaje('Error', 'El email y la contraseña no pueden estar vacíos.');
        return;
    }

    // Crea el objeto para el nuevo usuario
    const datosUsuario = {
        email,
        contrasenia
    };
    // Realiza la petición HTTP usando promesa
    conectarse(datosUsuario)
        .then((respuesta) => {
            // El id que viene del APIrestful
            const sessionId = respuesta.id; 
            // Creamos la cookie para la sesión
            document.cookie = "session_token=" + sessionId + 
            "; path=/; max-age=" + (60 * 60 * 24 * 7) + "; SameSite=Lax";

            // Mostramos un mensaje de éxito 2 segundos y redirigimos a index
            mostrarModalMensaje('Éxito', `Sesion de ${datosUsuario.email} iniciada correctamente.`);
            setTimeout(() => {
                window.location.href = '../index.html';
            }, 1500);
        })
        .catch((error) => {
            mostrarModalMensaje('Error', error.message || 'Error al conectarse');
        });
});

['email', 'contrasenia'].forEach(id => {
    document.getElementById(id).addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            event.target.blur(); // Quita el foco del campo que disparó el evento
            document.getElementById('boton-login').click();
        }
    });
});


// Función para enviar la petición de registro envuelta en una promesa
function conectarse(datosUsuario) {
    return new Promise((resolve, reject) => {
        const peticion = new XMLHttpRequest();
        peticion.open('POST', rutaServidor + '/users/login');
        peticion.setRequestHeader('Content-Type', 'application/json');
        peticion.send(JSON.stringify(datosUsuario));

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
                    const errorRespuesta = JSON.parse(peticion.responseText);
                    reject(new Error(`Error al conectarse: ${errorRespuesta.error || 'Error desconocido'}`));
                } catch (e) {
                    reject(new Error(`Error al conectarse: ${peticion.responseText}`));
                }
            }
        });

        peticion.addEventListener("error", function () {
            reject(new Error('No se pudo completar la solicitud. Por favor, intenta más tarde.'));
        });
    });
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