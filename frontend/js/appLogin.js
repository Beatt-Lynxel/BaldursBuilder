console.log("Cookies actuales:", document.cookie);

document.getElementById('boton-login').addEventListener('click', (event) => {
    event.preventDefault();
    // Obtiene los valores de los campos
    const email = document.querySelector('#email').value;
    const contrasenia = document.getElementById('contrasenia').value;

    // Validaciones
    if (!email || !contrasenia) {
        mostrarModal('Error', 'El email y la contraseña no pueden estar vacíos.');
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
            mostrarModal('Éxito', `Sesion de ${datosUsuario.email} iniciada correctamente.`);
            setTimeout(() => {
                window.location.href = '../index.html';
            }, 2000);
        })
        .catch((error) => {
            mostrarModal('Error', error.message || 'Error al conectarse');
        });
});

// Función para enviar la petición de registro envuelta en una promesa
function conectarse(datosUsuario) {
    return new Promise((resolve, reject) => {
        const peticion = new XMLHttpRequest();
        peticion.open('POST', 'http://localhost:4000/users/login');
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
                reject(new Error(`Error al conectarse: ${peticion.responseText}`));
            }
        });

        peticion.addEventListener("error", function () {
            reject(new Error('No se pudo completar la solicitud. Por favor, intenta más tarde.'));
        });
    });
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