console.log("Inicio Script");
const rutaServidor = "https://baldursbuilder.onrender.com";

// Listados de variables y arrays iniciales
// Puntos disponibles iniciales
let puntosDisponibles = 27;

// Valores iniciales de las caracteristicas
let caracteristicas = {
    fuerza: 8,
    destreza: 8,
    constitucion: 8,
    inteligencia: 8,
    sabiduria: 8,
    carisma: 8
};
// Mapeo de ID de clase a nombre de clase
const clases = {
    1: "Bárbaro",
    2: "Bardo",
    3: "Brujo",
    4: "Clérigo",
    5: "Druida",
    6: "Explorador",
    7: "Guerrero",
    8: "Hechicero",
    9: "Mago",
    10: "Monje",
    11: "Paladín",
    12: "Pícaro"
};
// Mapeo de ID de raza a nombre de raza
const razas = {
    1: "Elfo",
    2: "Enano",
    3: "Tiefling",
    4: "Drow",
    5: "Humano",
    6: "Gnomo",
    7: "Mediano",
    8: "Licántropo",
    9: "Semielfo",
    10: "Draconido",
    11: "Tabaxi"
};
// JSON del personaje (cambiar a objeto)
let personaje = {
    nombre: "Nueva Build",
    nombre_pj: "Tav",
    raza_id: 1,
    raza: "Elfo",
    clase_id: 1,
    clase: "Bárbaro",
    historia: "",
    fuerza: 8,
    destreza: 8,
    constitucion: 8,
    inteligencia: 8,
    sabiduria: 8,
    carisma: 8,
    bonus2: null,
    bonus1: null,
    arma: null,
    armadura: null,
    accesorio1: null,
    accesorio2: null,
    imagen: 0,
    publica: 0
};

let listaBuilds = null;
let listaBuildsPublicas = null;
let listaArmas = null;
let listaArmaduras = null;
let listaAccesorios = null;

let rolUsuario = 1;
let cropper;

// ------------------------------------------------------------------ Lista de funciones -----------------------------------------------------------
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
} // para eliminar la cookie si me hace falta

function obtenerRolUsuario(token) {
    return new Promise((resolve, reject) => {
        const peticion = new XMLHttpRequest();
        peticion.open('POST', rutaServidor + '/users/obtenerRol');
        peticion.setRequestHeader('Content-Type', 'application/json');
        peticion.send(JSON.stringify({ id: token }));

        peticion.addEventListener("load", function () {
            if (peticion.status >= 200 && peticion.status < 300) {
                try {
                    const respuesta = JSON.parse(peticion.responseText);
                    resolve(respuesta.rol); // Aquí se espera que sea 1 o 2
                } catch (error) {
                    reject(new Error('Error al procesar la respuesta: ' + error));
                }
            } else {
                reject(new Error(`Error al obtener el rol: ${peticion.responseText}`));
            }
        });

        peticion.addEventListener("error", function () {
            reject(new Error('No se pudo completar la solicitud.'));
        });
    });
} // para obtener el rol

function obtenerArmas() {
    return new Promise((resolve, reject) => {
        const peticion = new XMLHttpRequest();
        peticion.open('GET', rutaServidor + '/armas');

        peticion.addEventListener("load", function () {
            if (peticion.status >= 200 && peticion.status < 300) {
                try {
                    const respuesta = JSON.parse(peticion.responseText);
                    resolve(respuesta);
                } catch (error) {
                    reject(new Error('Error al procesar la respuesta: ' + error));
                }
            } else {
                reject(new Error(`Error al obtener las armas: ${peticion.responseText}`));
            }
        });
        peticion.addEventListener("error", function () {
            reject(new Error('No se pudo completar la solicitud. Por favor, intenta más tarde.'));
        });
        peticion.send();
    });
} // get armas

function obtenerArmaduras() {
    return new Promise((resolve, reject) => {
        const peticion = new XMLHttpRequest();
        peticion.open('GET', rutaServidor + '/armaduras');

        peticion.addEventListener("load", function () {
            if (peticion.status >= 200 && peticion.status < 300) {
                try {
                    const respuesta = JSON.parse(peticion.responseText);
                    resolve(respuesta);
                } catch (error) {
                    reject(new Error('Error al procesar la respuesta: ' + error));
                }
            } else {
                reject(new Error(`Error al obtener las armaduras: ${peticion.responseText}`));
            }
        });
        peticion.addEventListener("error", function () {
            reject(new Error('No se pudo completar la solicitud. Por favor, intenta más tarde.'));
        });
        peticion.send();
    });
} // get armaduras

function obtenerAccesorios() {
    return new Promise((resolve, reject) => {
        const peticion = new XMLHttpRequest();
        peticion.open('GET', rutaServidor + '/accesorios');

        peticion.addEventListener("load", function () {
            if (peticion.status >= 200 && peticion.status < 300) {
                try {
                    const respuesta = JSON.parse(peticion.responseText);
                    resolve(respuesta);
                } catch (error) {
                    reject(new Error('Error al procesar la respuesta: ' + error));
                }
            } else {
                reject(new Error(`Error al obtener las accesorios: ${peticion.responseText}`));
            }
        });
        peticion.addEventListener("error", function () {
            reject(new Error('No se pudo completar la solicitud. Por favor, intenta más tarde.'));
        });
        peticion.send();
    });
} // get accesorios

function obtenerBuildsDelUsuario() {
    return new Promise((resolve, reject) => {
        const sessionCookie = document.cookie.split('; ').find(row => row.startsWith('session_token='));
        if (!sessionCookie) return reject(new Error('No se encontró session_token'));
        const token = sessionCookie.split('=')[1];

        const peticion = new XMLHttpRequest();
        peticion.open('GET', rutaServidor + '/builds/misBuilds?token=' + token);
        peticion.addEventListener("load", function () {
            if (peticion.status >= 200 && peticion.status < 300) {
                try {
                    const respuesta = JSON.parse(peticion.responseText);
                    resolve(respuesta);
                } catch (error) {
                    reject(new Error('Error al procesar la respuesta: ' + error));
                }
            } else {
                reject(new Error(`Error al obtener las builds: ${peticion.responseText}`));
            }
        });
        peticion.addEventListener("error", function () {
            reject(new Error('No se pudo completar la solicitud. Por favor, intenta más tarde.'));
        });
        peticion.send();
    });
} // get builds usuario

function obtenerBuildsPublicas() {
    return new Promise((resolve, reject) => {
        const sessionCookie = document.cookie.split('; ').find(row => row.startsWith('session_token='));
        let token = 0;
        if (sessionCookie) {
            token = sessionCookie.split('=')[1];
        }
        console.log(token);
        
        const peticion = new XMLHttpRequest();
        peticion.open('GET', rutaServidor + '/builds/publicas?token=' + token);
        peticion.addEventListener("load", function () {
            if (peticion.status >= 200 && peticion.status < 300) {
                try {
                    const respuesta = JSON.parse(peticion.responseText);
                    resolve(respuesta);
                } catch (error) {
                    reject(new Error('Error al procesar la respuesta: ' + error));
                }
            } else {
                reject(new Error(`Error al obtener las builds: ${peticion.responseText}`));
            }
        });
        peticion.addEventListener("error", function () {
            reject(new Error('No se pudo completar la solicitud. Por favor, intenta más tarde.'));
        });
        peticion.send();
    });
} // get publicas

function editarBuild() {
    // Mapeamos raza y clase de string a ID (esto ya debes tener en algún lugar definido)
    const razaId = Object.keys(razas).find(key => razas[key] === personaje.raza) || 1;
    const claseId = Object.keys(clases).find(key => clases[key] === personaje.clase) || 1;
    personaje.user_id = sessionCookie.split('=')[1];
    const datosPeticionEditar = {
        ...personaje,
        raza_id: parseInt(razaId),
        clase_id: parseInt(claseId)
    };
    const peticionEditar = new XMLHttpRequest();
    peticionEditar.open("POST", rutaServidor + "/builds/editar");
    peticionEditar.setRequestHeader("Content-Type", "application/json");
    peticionEditar.onload = function () {
        if (peticionEditar.status === 200) {
            mostrarModalMensaje("Info", "Build editada correctamente.");
            console.log("Build editada correctamente.");
            obtenerBuildsDelUsuario()
            .then(builds => {
                console.log('Builds del usuario:', builds);
                // variable global
                listaBuilds = builds;
            })
            .catch(error => {
                console.error('Error al cargar las builds:', error);
            });
            actualizarPersonaje();

        } else {
            console.error("Error al editar build:", peticionEditar.responseText);
            mostrarModalMensaje("Error", peticionEditar.responseText || "Ocurrió un error al editar la build.");
        }
    };
    peticionEditar.onerror = function () {
        mostrarModalMensaje("Error", "No se pudo conectar con el servidor.");
    };
    peticionEditar.send(JSON.stringify(datosPeticionEditar));
} // editarB

function getBonus(claseBonus) {
    const atributos = ["fuerza", "destreza", "constitucion", "inteligencia", "sabiduria", "carisma"];
    for (let atributo of atributos) {
        const checkbox = document.querySelector(`input[name="${atributo}"].${claseBonus}:checked`);
        if (checkbox) {
            return atributo;
        }
    }
    return null;
} // Función para obtener el bonus seleccionado

function actualizarPersonaje() {
    // Actualizar datos básicos
    personaje.nombre = document.getElementById("input-nombre-build").value || "Nueva Build";
    personaje.nombre_pj = document.getElementById("input-nombre").value || "Tav";
    // Obtener el valor seleccionado en el <select>
    let razaSelect = document.getElementById("input-raza");
    let claseSelect = document.getElementById("input-clase");
    personaje.raza = razaSelect.options[razaSelect.selectedIndex].text || "Draconido";
    personaje.clase = claseSelect.options[claseSelect.selectedIndex].text || "Clérigo";
    personaje.historia = document.getElementById("input-historia").value || "";
    // Actualizar caracteristicas
    Object.keys(caracteristicas).forEach(caracteristica => {
        personaje[caracteristica] = caracteristicas[caracteristica];
    });
    // Actualizar bonificaciones
    personaje.bonus2 = getBonus("mas2");
    personaje.bonus1 = getBonus("mas1");

    console.log("JSON actualizado:", JSON.stringify(personaje, null, 2));
    actualizarUI();
}// Sincronizar el JSON y la UI

function actualizarUI() {
    //Atributos Pj por defecto
    let ataquePj = 6;
    let atributoPj = "fue";
    let defensaPj = 10;
    let vidaPj = calcularVida(personaje.constitucion);
    document.getElementById("vida-personaje").textContent = vidaPj;
    // Actualizar puntos disponibles
    document.getElementById("puntos-disponibles").textContent = puntosDisponibles;
    // Actualizar Nombre de la build,Nombre, Raza y Clase
    document.getElementById("nombre-build").textContent = personaje.nombre;
    document.getElementById("nombre-personaje").textContent = personaje.nombre_pj;
    document.getElementById("raza-personaje").textContent = personaje.raza;
    document.getElementById("clase-personaje").textContent = personaje.clase;
    // actualizar ataque
    if (personaje.arma == null) {
        document.getElementById("slot-arma").textContent = "Selecionar Arma (fue): 6 de ataque sin armas";
    } else {
        document.getElementById("slot-arma").textContent = `${listaArmas[(personaje.arma)-1].nombre} (${listaArmas[(personaje.arma)-1].atributo.substring(0, 3)}): ${listaArmas[(personaje.arma)-1].ataque} de ataque`;
        ataquePj = listaArmas[(personaje.arma)-1].ataque;
        atributoPj = listaArmas[(personaje.arma)-1].atributo.substring(0, 3);
    }
    document.getElementById("ataque-personaje").textContent = `${ataquePj} (${atributoPj})`;
    // actualizar defensa
    if (personaje.armadura == null) {
        document.getElementById("slot-armadura").textContent =  "Selecionar Armadura: 10 de defensa sin armadura";
    } else {
        document.getElementById("slot-armadura").textContent = `${listaArmaduras[(personaje.armadura)-1].nombre}: ${listaArmaduras[(personaje.armadura)-1].defensa} de defensa`;
        defensaPj = listaArmaduras[(personaje.armadura)-1].defensa;
    }
    document.getElementById("defensa-personaje").textContent = defensaPj;

    if (personaje.accesorio1 == null) {
        document.getElementById("slot-accesorio1").textContent = "Selecionar Accesorio 1";
    } else {
        document.getElementById("slot-accesorio1").textContent = `${listaAccesorios[(personaje.accesorio1)-1].nombre}: ${listaAccesorios[(personaje.accesorio1)-1].valor} de ${listaAccesorios[(personaje.accesorio1)-1].atributo}`;
    }
    if (personaje.accesorio2 == null) {
        document.getElementById("slot-accesorio2").textContent = "Selecionar Accesorio 2";
    } else {
        document.getElementById("slot-accesorio2").textContent = `${listaAccesorios[(personaje.accesorio2)-1].nombre}: ${listaAccesorios[(personaje.accesorio2)-1].valor} de ${listaAccesorios[(personaje.accesorio2)-1].atributo}`;
    }
    // Actualizar inputs
    document.getElementById("input-nombre-build").value = personaje.nombre;
    document.getElementById("input-nombre").value = personaje.nombre_pj;
    // Asignar la raza
    let razaSelect = document.getElementById("input-raza");
    for (let option of razaSelect.options) {
        if (option.text === personaje.raza) {
            option.selected = true;
            break;
        }
    }
    // Actualizar custom select visual para raza
    const customRaza = razaSelect.nextElementSibling;
    if (customRaza) {
        customRaza.textContent = personaje.raza;
        const opciones = customRaza.nextElementSibling?.querySelectorAll("div");
        opciones?.forEach(opt => {
            if (opt.textContent === personaje.raza) {
                opt.classList.add("same-as-selected");
            } else {
                opt.classList.remove("same-as-selected");
            }
        });
    }
    // Asignar la clase
    let claseSelect = document.getElementById("input-clase");
    for (let option of claseSelect.options) {
        if (option.text === personaje.clase) {
            option.selected = true;
            break;
        }
    }
    // Actualizar custom select visual para clase
    const customClase = claseSelect.nextElementSibling;
    if (customClase) {
        customClase.textContent = personaje.clase;
        const opciones = customClase.nextElementSibling?.querySelectorAll("div");
        opciones?.forEach(opt => {
            if (opt.textContent === personaje.clase) {
                opt.classList.add("same-as-selected");
            } else {
                opt.classList.remove("same-as-selected");
            }
        });
    }
    document.getElementById("input-historia").value = personaje.historia; 
    // Actualizar caracteristicas y modificadores
    Object.keys(caracteristicas).forEach(caracteristica => {
        const valor = caracteristicas[caracteristica];
        const bono1 = personaje.bonus1 === caracteristica ? 1 : 0;
        const bono2 = personaje.bonus2 === caracteristica ? 2 : 0;
        let accesorio1 = 0;
        let accesorio2 = 0;
        if (personaje.accesorio1 != null) {
            accesorio1 = listaAccesorios[(personaje.accesorio1)-1].atributo === caracteristica ? listaAccesorios[(personaje.accesorio1)-1].valor : 0;
        }
        if (personaje.accesorio2 != null) {
            accesorio2 = listaAccesorios[(personaje.accesorio2)-1].atributo === caracteristica ? listaAccesorios[(personaje.accesorio2)-1].valor : 0;
        }
        console.log("Caracteristica: " + caracteristica + ", Valor: " + valor + ", Bono1: " + bono1 + ", Bono2: " + bono2 + ", accesorio1: " + accesorio1 + ", accesorio2: " + accesorio2);
        
        const valorFinal = valor + bono1 + bono2 + accesorio1 + accesorio2;
        const modificador = calcularModificador(valorFinal);

        // Actualizar valores, modificadores y habilidades en la UI
        document.getElementById(`${caracteristica}-valor`).textContent = valor;
        document.getElementById(`${caracteristica}-valor`).style.paddingLeft = valor >= 10 ? "4px" : "10px";
        document.getElementById(`${caracteristica}-mod`).textContent = `(${modificador >= 0 ? "+" : ""}${modificador})`;
        document.getElementById(caracteristica).textContent = valorFinal;
        // Actualizar habilidades relacionadas con el modificador
        const habilidades = Array.from(document.querySelectorAll(`.${caracteristica}`));
        habilidades.forEach(habilidad => {
            habilidad.innerHTML = modificador;
        });
        // Seleccionar botones
        const botonMenos = document.getElementById(`${caracteristica}-menos`);
        const botonMas = document.getElementById(`${caracteristica}-mas`);
        // Actualizar estado del botón "menos"
        if (valor === 8) {
            botonMenos.disabled = true;
            botonMenos.classList.add("boton-inactivo");
            botonMenos.classList.remove("boton-activo");
        } else {
            botonMenos.disabled = false;
            botonMenos.classList.add("boton-activo");
            botonMenos.classList.remove("boton-inactivo");
        }
        // Actualizar estado del botón "más"
        if (valor === 15 || puntosDisponibles === 0 || ((valor === 14 || valor === 13) && puntosDisponibles <= 1)) {
            botonMas.disabled = true;
            botonMas.classList.add("boton-inactivo");
            botonMas.classList.remove("boton-activo");
        } else {
            botonMas.disabled = false;
            botonMas.classList.add("boton-activo");
            botonMas.classList.remove("boton-inactivo");
        }
    });
    if (personaje.publica === 1) {
        document.getElementById("checkbox-publica").checked = true;
    } else {
        document.getElementById("checkbox-publica").checked = false;
    }
    const imagenBuild = document.getElementById("imagen-build");

    if (personaje.imagen === 1) {
        imagenBuild.style.backgroundImage = `url('${rutaServidor}/uploads/builds/build-${personaje.id}.png#${new Date().getTime()}')`;
    } else {
        imagenBuild.style.backgroundImage = `url('./media/builds/build-${personaje.raza}.png')`;
    }
    console.log("ENTRA EN UI");
    
} // Actualizar la UI

function calcularVida(constitucion) {
    const valor = constitucion;
    const bono1 = personaje.bonus1 === constitucion ? 1 : 0;
    const bono2 = personaje.bonus2 === constitucion ? 2 : 0;
    let accesorio1 = 0;
    let accesorio2 = 0;
    let nombre1 = "nada";
    let nombre2 = "nada";
    if (personaje.accesorio1 != null) {
        accesorio1 = listaAccesorios[(personaje.accesorio1)-1].atributo === "constitucion" ? listaAccesorios[(personaje.accesorio1)-1].valor : 0;
        nombre1 = listaAccesorios[(personaje.accesorio1)-1].nombre;
    }
    if (personaje.accesorio2 != null) {
        accesorio2 = listaAccesorios[(personaje.accesorio2)-1].atributo === "constitucion" ? listaAccesorios[(personaje.accesorio2)-1].valor : 0;
        nombre2 = listaAccesorios[(personaje.accesorio2)-1].nombre;
    }
    console.log("Accesorio1: " + nombre1 + "Accesorio2: " + nombre2 + "Caracteristica: constitucion(vida)" 
        + ", Valor: " + valor + ", Bono1: " + bono1 + ", Bono2: " + bono2 + ", accesorio1: " 
        + accesorio1 + ", accesorio2: " + accesorio2);
    const valorFinal = valor + bono1 + bono2 + accesorio1 + accesorio2;
    const modificador = calcularModificador(valorFinal);
    const vida = 7 + 10*(modificador + 5);
    return vida;
} // calcular vida, en funcion de la constitucion

function calcularModificador(atributo) {
    return Math.floor((atributo - 10) / 2);
} // Calcular modificador basado en el atributo

function cambiarHabilidad(habilidad, incremento) {
    const valorActual = caracteristicas[habilidad];
    const costoSubida = valorActual >= 13 ? 2 : 1;
    const costoBajada = valorActual >= 14 ? 2 : 1;
    if (incremento && puntosDisponibles >= costoSubida && valorActual < 15) {
        caracteristicas[habilidad] += 1;
        puntosDisponibles -= costoSubida;
    } else if (!incremento && valorActual > 8) {
        caracteristicas[habilidad] -= 1;
        puntosDisponibles += costoBajada;
    }
    actualizarPersonaje();
} // Manejar cambios en habilidades

function validarFormatoPersonaje(datos) {
    const atributos = ["fuerza", "destreza", "constitucion", "inteligencia", "sabiduria", "carisma"];
    return (
        typeof datos === "object" &&
        typeof datos.nombre === "string" &&
        typeof datos.nombre_pj === "string" &&
        typeof datos.raza === "string" &&
        typeof datos.clase === "string" &&
        typeof datos.historia === "string" &&
        atributos.every(attr => typeof datos[attr] === "number" && datos[attr] >= 8 && datos[attr] <= 15) &&
        (datos.bonus2 === null || atributos.includes(datos.bonus2)) &&
        (datos.bonus1 === null || atributos.includes(datos.bonus1))
    );
} // Validar el formato del personaje importado

function exportarPersonaje() {
    const personajeJSON = JSON.stringify(personaje, null, 2);
    const blob = new Blob([personajeJSON], { type: "application/json" });
    const enlace = document.createElement("a");
    enlace.href = URL.createObjectURL(blob);
    enlace.download = `${personaje.nombre}.json`;
    enlace.click();
    console.log("Exportación realizada correctamente.");
} // funcion para exportar los datos del personaje a un archivo .json

function importarPersonaje() {
    const inputArchivo = document.createElement("input");
    inputArchivo.type = "file";
    inputArchivo.accept = ".json";
    inputArchivo.addEventListener("change", (evento) => {
        const archivo = evento.target.files[0];
        if (archivo) {
            const lector = new FileReader();
            lector.onload = (e) => {
                try {
                    const datos = JSON.parse(e.target.result);
                    if (validarFormatoPersonaje(datos)) {
                        personaje = datos;
                        puntosDisponibles = calcularPuntosRestantes(datos);
                        caracteristicas = {
                            fuerza: datos.fuerza,
                            destreza: datos.destreza,
                            constitucion: datos.constitucion,
                            inteligencia: datos.inteligencia,
                            sabiduria: datos.sabiduria,
                            carisma: datos.carisma
                        };
                        actualizarCheckboxes(datos);
                        actualizarUI();
                        mostrarModalMensaje("Info", "Importación realizada correctamente.");
                    } else {
                        console.error("El archivo no tiene el formato correcto.");
                        mostrarModalMensaje("Error", "El archivo no tiene el formato correcto.");
                    }
                } catch (error) {
                    mostrarModalMensaje("Error", "Error al leer el archivo JSON.");
                    console.error(error);
                }
            };
            lector.readAsText(archivo);
        }
    });
    inputArchivo.click();
} // funcion para importar los datos del personaje de un archivo .json

function calcularPuntosRestantes(datos) {
    let puntosGastados = 0;
    Object.keys(caracteristicas).forEach(habilidad => {
        const valor = datos[habilidad];
        if (valor > 8) {
            puntosGastados += (valor - 8) + (valor > 13 ? 1 : 0) + (valor > 14 ? 1 : 0);
        }
    });
    return 27 - puntosGastados;
}

function actualizarCheckboxes(datos) {
    // Limpiamos todos los checkboxes
    document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => checkbox.checked = false);
    // Asignar los bonus
    if (datos.bonus2) {
        document.querySelector(`input[name="${datos.bonus2}"].mas2`).checked = true;
    }
    if (datos.bonus1) {
        document.querySelector(`input[name="${datos.bonus1}"].mas1`).checked = true;
    }
}

function irASimulador() {
    localStorage.setItem("personajeGuardado", JSON.stringify(personaje));
    localStorage.setItem("armasGuardadas", JSON.stringify(listaArmas));
    localStorage.setItem("armadurasGuardadas", JSON.stringify(listaArmaduras));
    localStorage.setItem("accesoriosGuardados", JSON.stringify(listaAccesorios));
    window.location.href = "htmls/simulador.html";
} // para ir al simulador

function controlCheckbox() {
    // Lista de atributos a validar
    const atributos = ["fuerza", "destreza", "constitucion", "inteligencia", "sabiduria", "carisma"];
    atributos.forEach(atributo => {
        // Obtener los checkboxes de cada atributo
        const checkboxes = document.querySelectorAll(`input[name="${atributo}"]`);
        checkboxes.forEach(checkbox => {
            checkbox.addEventListener("change", () => {
                if (checkbox.checked) {
                    // Evitar seleccionar +1 y +2 del mismo atributo
                    checkboxes.forEach(cb => {
                        if (cb !== checkbox) cb.checked = false;
                    });
                    // Si se selecciona un nuevo +2, desmarcar el anterior
                    if (checkbox.classList.contains("mas2")) {
                        document.querySelectorAll(`input.mas2:checked`).forEach(cb => {
                            if (cb !== checkbox) cb.checked = false;
                        });
                    }
                    // Si se selecciona un nuevo +1, desmarcar el anterior
                    if (checkbox.classList.contains("mas1")) {
                        document.querySelectorAll(`input.mas1:checked`).forEach(cb => {
                            if (cb !== checkbox) cb.checked = false;
                        });
                    }
                }
                // FORZAR la actualización del JSON después de que el DOM haya reflejado los cambios
                setTimeout(() => {
                    actualizarPersonaje();
                }, 0);
            });
        });
    });
} // Para controlar los checkbox

function mostrarModalItems(tipo, lista) {
    // Borrar modal anterior si existe
    let modal = document.getElementById("modal-items");
    if (modal) modal.remove();
    // Crear modal desde cero
    modal = document.createElement("div");
    modal.id = "modal-items";
    modal.classList.add("modal-background");

    const modalContent = document.createElement("div");
    modalContent.id = "modal-items-content";
    modalContent.classList.add("modal-content");
    modal.appendChild(modalContent);
    // Título dinámico
    const titulo = document.createElement("h2");
    titulo.textContent = `Seleccionar ${tipo}`;
    modalContent.appendChild(titulo);
    const contenedor = document.createElement("div");
    contenedor.classList.add("contenedor-lista-items");

    lista.forEach(item => {
        const itemElement = document.createElement("div");
        itemElement.classList.add("slot");
        itemElement.dataset.id = item.id;
        const nombre = document.createElement("p");
        nombre.textContent = item.nombre;
        nombre.style.textAlign = "center";
        itemElement.appendChild(nombre);
        // Datos dinámicos según tipo
        if (tipo === "Arma") {
            const ataque = document.createElement("p");
            ataque.textContent = `Ataque: ${item.ataque}`;
            itemElement.appendChild(ataque);
            const atributo = document.createElement("p");
            atributo.textContent = `Atributo: ${item.atributo}`;
            itemElement.appendChild(atributo);
            itemElement.addEventListener("click", () => {
                personaje.arma = itemElement.dataset.id;
                actualizarPersonaje();
                modal.remove();
            });
        } else if (tipo === "Armadura") {
            const defensa = document.createElement("p");
            defensa.textContent = `Defensa: ${item.defensa}`;
            itemElement.appendChild(defensa);
            itemElement.addEventListener("click", () => {
                personaje.armadura = itemElement.dataset.id;
                actualizarPersonaje();
                modal.remove();
            });
        } else if (tipo === "Accesorio1") {
            const atributo = document.createElement("p");
            atributo.textContent = `Atributo: ${item.atributo}`;
            itemElement.appendChild(atributo);
            const valor = document.createElement("p");
            valor.textContent = `Valor: ${item.valor}`;
            itemElement.appendChild(valor);
            itemElement.addEventListener("click", () => {
                personaje.accesorio1 = itemElement.dataset.id;
                actualizarPersonaje();
                modal.remove();
            });
        } else if (tipo === "Accesorio2") {
            const atributo = document.createElement("p");
            atributo.textContent = `Atributo: ${item.atributo}`;
            itemElement.appendChild(atributo);
            const valor = document.createElement("p");
            valor.textContent = `Valor: ${item.valor}`;
            itemElement.appendChild(valor);
            itemElement.addEventListener("click", () => {
                personaje.accesorio2 = itemElement.dataset.id;
                actualizarPersonaje();
                modal.remove();
            });
        }
        contenedor.appendChild(itemElement);
    });
    modalContent.appendChild(contenedor);
    document.body.appendChild(modal);
    // Cerrar al hacer clic fuera
    modal.addEventListener("click", function (e) {
        if (e.target === modal) {
            modal.remove();
        }
    });
} // modal equipamiento

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

function mostrarModalBuilds(lista, esPublica = false) {
    if (!Array.isArray(lista)) {
        mostrarModalMensaje("Info", "No hay builds cargadas.");
        return;
    }

    // Crear el contenedor del modal si no existe
    let modalBuilds = document.getElementById("modal-builds");
    if (!modalBuilds) {
        modalBuilds = document.createElement("div");
        modalBuilds.id = "modal-builds";
        modalBuilds.classList.add("modal-background");

        const modalBuildsContent = document.createElement("div");
        modalBuildsContent.id = "modal-content";
        modalBuildsContent.classList.add("modal-content");

        modalBuilds.appendChild(modalBuildsContent);
        document.body.appendChild(modalBuilds);

        modalBuilds.addEventListener("click", function (e) {
            if (e.target === modalBuilds) {
                modalBuilds.remove();
            }
        });
    }

    const modalBuildsContent = document.getElementById("modal-content");
    modalBuildsContent.innerHTML = `<h2>${esPublica ? "Builds Públicas" : "Mis Builds"}</h2>`;
    const contenedorBuilds = document.createElement("div");
    contenedorBuilds.classList.add("contenedor-lista-builds");

    lista.forEach(build => {
        const buildElement = document.createElement("div");
        buildElement.classList.add("build-item");

        const buildNombre = document.createElement("p");
        buildNombre.textContent = `${build.nombre}:`;
        buildElement.appendChild(buildNombre);

        const buildInfo = document.createElement("p");
        buildInfo.textContent = `${razas[build.raza_id]} - ${clases[build.clase_id]}`;
        buildElement.appendChild(buildInfo);

        const botonesBuild = document.createElement("div");
        botonesBuild.classList.add("botones-lista-build");

        const seleccionarButton = document.createElement("button");
        seleccionarButton.textContent = "Seleccionar";
        seleccionarButton.classList.add("btn-seleccionar", "boton-superior");
        seleccionarButton.dataset.id = build.id;
        seleccionarButton.dataset.publica = esPublica;
        seleccionarButton.addEventListener("click", function () {
            const buildId = this.dataset.id;
            const buildPublica = this.dataset.publica;
            
            const peticion = new XMLHttpRequest();
            peticion.open('GET', rutaServidor + `/builds/${buildId}`);
            peticion.addEventListener("load", function () {
                if (peticion.status >= 200 && peticion.status < 300) {
                    try {
                        const datosBuild = JSON.parse(peticion.responseText);
                        personaje = datosBuild;
                        puntosDisponibles = calcularPuntosRestantes(personaje);
                        let numRaza = datosBuild.raza_id;
                        let numClase = datosBuild.clase_id;
                        personaje.raza = razas[numRaza];
                        personaje.clase = clases[numClase];
                        caracteristicas = {
                            fuerza: datosBuild.fuerza,
                            destreza: datosBuild.destreza,
                            constitucion: datosBuild.constitucion,
                            inteligencia: datosBuild.inteligencia,
                            sabiduria: datosBuild.sabiduria,
                            carisma: datosBuild.carisma
                        };
                        actualizarCheckboxes(personaje);
                        actualizarUI();
                        document.getElementById("contenedor-medio").classList.remove("oculto");
                        document.getElementById("contenedor-inferior").classList.remove("oculto");
                        console.log("DATASET PUBLICA: " + buildPublica);
                        if (buildPublica == "true") {
                            document.getElementById("boton-imagen").classList.add("oculto");
                            document.getElementById("boton-borrar-imagen").classList.add("oculto");
                            document.getElementById("checkbox-publica").disabled = true;
                        } else {
                            document.getElementById("boton-imagen").classList.remove("oculto");
                            document.getElementById("boton-borrar-imagen").classList.remove("oculto");
                            document.getElementById("checkbox-publica").disabled = false;
                        }
                        modalBuilds.remove();
                    } catch (error) {
                        console.error("Error al procesar la build:", error);
                    }
                } else {
                    console.error("Error al obtener la build:", peticion.responseText);
                }
            });
            peticion.addEventListener("error", function () {
                console.error("Fallo al obtener la build del servidor");
            });
            peticion.send();
        });
        botonesBuild.appendChild(seleccionarButton);

        if (!esPublica) {
            const eliminarButton = document.createElement("button");
            eliminarButton.textContent = "Eliminar";
            eliminarButton.classList.add("btn-eliminar", "boton-superior");
            eliminarButton.dataset.id = build.id;

            eliminarButton.addEventListener("click", function () {
                const buildId = this.dataset.id;
                mostrarModalMensaje("Confirmación", "¿Estás seguro de que deseas eliminar esta build?", function () {
                    if (personaje.imagen == 1) {
                        borrarImagen();
                    }
                    const peticion = new XMLHttpRequest();
                    peticion.open("DELETE", rutaServidor + `/builds/borrar`);
                    peticion.setRequestHeader("Content-Type", "application/json");
                    peticion.onload = function () {
                        if (peticion.status >= 200 && peticion.status < 300) {
                            console.log("Build eliminada correctamente");
                            mostrarModalMensaje("Info", "Build eliminada correctamente.");
                            buildElement.remove();
                            listaBuilds = listaBuilds.filter(b => b.id != buildId);
                        } else {
                            console.error("Error al eliminar build:", peticion.responseText);
                            const respuesta = JSON.parse(peticion.responseText);
                            mostrarModalMensaje("Error", respuesta.error || "Ocurrió un error al eliminar la build.");
                        }
                    };
                    peticion.onerror = function () {
                        console.error("No se pudo conectar con el servidor.");
                        mostrarModalMensaje("Error", "No se pudo conectar con el servidor.");
                    };
                    peticion.send(JSON.stringify({ id: buildId }));
                });
            });
            botonesBuild.appendChild(eliminarButton);
        }

        if (esPublica && rolUsuario == 2) {
            const eliminarButton = document.createElement("button");
            eliminarButton.textContent = "Ocultar";
            eliminarButton.classList.add("btn-eliminar", "boton-superior");
            eliminarButton.dataset.id = build.id;

            eliminarButton.addEventListener("click", function () {
                const buildId = this.dataset.id;
                const peticion = new XMLHttpRequest();
                peticion.open('GET', rutaServidor + `/builds/${buildId}`);
                peticion.addEventListener("load", function () {
                    if (peticion.status >= 200 && peticion.status < 300) {
                        try {
                            const datosBuild = JSON.parse(peticion.responseText);
                            personaje = datosBuild;
                            puntosDisponibles = calcularPuntosRestantes(personaje);
                            let numRaza = datosBuild.raza_id;
                            let numClase = datosBuild.clase_id;
                            personaje.raza = razas[numRaza];
                            personaje.clase = clases[numClase];
                            caracteristicas = {
                                fuerza: datosBuild.fuerza,
                                destreza: datosBuild.destreza,
                                constitucion: datosBuild.constitucion,
                                inteligencia: datosBuild.inteligencia,
                                sabiduria: datosBuild.sabiduria,
                                carisma: datosBuild.carisma
                            };
                            mostrarModalMensaje("Confirmación", "¿Estás seguro de que deseas ocultar esta build?", function () {
                                personaje.publica = 0;
                                const peticion = new XMLHttpRequest();
                                peticion.open("POST", rutaServidor + `/builds/ocultar`);
                                peticion.setRequestHeader("Content-Type", "application/json");
                                peticion.onload = function () {
                                    if (peticion.status >= 200 && peticion.status < 300) {
                                        console.log("Build ocultada correctamente");
                                        mostrarModalMensaje("Info", "Build ocultada correctamente.");
                                        buildElement.remove();
                                        listaBuildsPublicas = listaBuildsPublicas.filter(b => b.id != buildId);
                                    } else {
                                        console.error("Error al ocultar build:", peticion.responseText);
                                        const respuesta = JSON.parse(peticion.responseText);
                                        mostrarModalMensaje("Error", respuesta.error || "Ocurrió un error al ocultar la build.");
                                    }
                                    
                                };
                                peticion.onerror = function () {
                                    console.error("No se pudo conectar con el servidor.");
                                    mostrarModalMensaje("Error", "No se pudo conectar con el servidor.");
                                };
                                peticion.send(JSON.stringify({ id: buildId }));
                            });
                        } catch (error) {
                            mostrarModalMensaje("Error", "No se pudo obtener la build.");
                            console.error("Error al procesar la build:", error);
                        }
                    } else {
                        mostrarModalMensaje("Error", "No se pudo obtener la build.");
                        console.error("Error al obtener la build:", peticion.responseText);
                    }
                });
                peticion.addEventListener("error", function () {
                    console.error("Fallo al obtener la build del servidor");
                });
                peticion.send();
            });
            botonesBuild.appendChild(eliminarButton);
        }

        buildElement.appendChild(botonesBuild);
        contenedorBuilds.appendChild(buildElement);
    });

    modalBuildsContent.appendChild(contenedorBuilds);
} // modal


// ----------------------------------------------------------------- Event Listeners:---------------------------------------------------------------
document.getElementById('boton-cerrar').addEventListener('click', () => {
    console.log('Cerrando sesion');
    eliminarCookie("session_token");
    setTimeout(() => { window.location.href = './index.html';}, 200);
}); // Evento para eliminar la sesion y recargar la pagina

document.getElementById("boton-lista-builds").addEventListener("click", function () {
    mostrarModalBuilds(listaBuilds, false);
});
document.getElementById("boton-lista-publicas").addEventListener("click", function () {
    mostrarModalBuilds(listaBuildsPublicas, true);
}); 

document.getElementById("boton-crear-build").addEventListener('click', () =>{
    document.getElementById("contenedor-medio").classList.remove("oculto");
    document.getElementById("contenedor-inferior").classList.remove("oculto");
}); // Event listener para el boton crear build

// Event para cambiar entre trasfondo, habilidades y equipamiento
document.getElementById("boton-trasfondo").addEventListener('click', () => {
    document.getElementById("boton-trasfondo").classList.add("seleccionado");
    document.getElementById("boton-habilidades").classList.remove("seleccionado");
    document.getElementById("boton-equipamiento").classList.remove("seleccionado");
    document.getElementById("contenido-trasfondo").classList.remove("oculto");
    document.getElementById("contenido-habilidades").classList.add("oculto");
    document.getElementById("contenido-equipamiento").classList.add("oculto");
});
document.getElementById("boton-habilidades").addEventListener('click', () => {
    document.getElementById("boton-trasfondo").classList.remove("seleccionado");
    document.getElementById("boton-habilidades").classList.add("seleccionado");
    document.getElementById("boton-equipamiento").classList.remove("seleccionado");
    document.getElementById("contenido-trasfondo").classList.add("oculto");
    document.getElementById("contenido-habilidades").classList.remove("oculto");
    document.getElementById("contenido-equipamiento").classList.add("oculto");
});
document.getElementById("boton-equipamiento").addEventListener('click', () => {
    document.getElementById("boton-trasfondo").classList.remove("seleccionado");
    document.getElementById("boton-habilidades").classList.remove("seleccionado");
    document.getElementById("boton-equipamiento").classList.add("seleccionado");
    document.getElementById("contenido-trasfondo").classList.add("oculto");
    document.getElementById("contenido-habilidades").classList.add("oculto");
    document.getElementById("contenido-equipamiento").classList.remove("oculto");
});

Object.keys(caracteristicas).forEach(habilidad => {
    document.getElementById(`${habilidad}-mas`).addEventListener("click", () => cambiarHabilidad(habilidad, true));
    document.getElementById(`${habilidad}-menos`).addEventListener("click", () => cambiarHabilidad(habilidad, false));
}); // Asignar eventos a los botones de habilidades
["input-nombre-build", "input-nombre", "input-historia"].forEach(id => {
    document.getElementById(id).addEventListener("blur", actualizarPersonaje);
}); // Asignar eventos a los inputs de texto
["input-raza", "input-clase"].forEach(id => {
    document.getElementById(id).addEventListener("change", actualizarPersonaje);
}); // Asignar eventos a los inputs de select

// Events de los slots de arma, armadura y accesorios
document.getElementById("slot-arma").addEventListener("click", function () {
    mostrarModalItems("Arma", listaArmas);
});
document.getElementById("slot-armadura").addEventListener("click", function () {
    mostrarModalItems("Armadura", listaArmaduras);
});
document.getElementById("slot-accesorio1").addEventListener("click", function () {
    mostrarModalItems("Accesorio1", listaAccesorios);
});
document.getElementById("slot-accesorio2").addEventListener("click", function () {
    mostrarModalItems("Accesorio2", listaAccesorios);
});

// event listener de simulador, importar y exportar
document.getElementById("boton-importar").addEventListener("click", importarPersonaje);
document.getElementById("boton-exportar").addEventListener("click", exportarPersonaje);
document.getElementById("boton-simulador").addEventListener("click", irASimulador);

document.getElementById("boton-editar").addEventListener("click", function () {
    const sessionCookie = document.cookie.split('; ').find(row => row.startsWith('session_token='));
    if (!sessionCookie) {
        mostrarModalMensaje("Error", "No hay sesión activa. No puedes guardar la build.");
        return;
    }
    editarBuild();
}); // event listener para editar una build


document.getElementById("boton-crear").addEventListener("click", function () {
    const sessionCookie = document.cookie.split('; ').find(row => row.startsWith('session_token='));
    if (!sessionCookie) {
        mostrarModalMensaje("Error", "No hay sesión activa. No puedes crear la build.");
        return;
    }
    // Mapeamos raza y clase de string a ID (esto ya debes tener en algún lugar definido)
    const razaId = Object.keys(razas).find(key => razas[key] === personaje.raza) || 1;
    const claseId = Object.keys(clases).find(key => clases[key] === personaje.clase) || 1;
    personaje.user_id = sessionCookie.split('=')[1];
    personaje.imagen = 0;
    personaje.publica = 0;
    const datosPeticionCrear = {
        ...personaje,
        raza_id: parseInt(razaId),
        clase_id: parseInt(claseId)
    };
    const peticionCrear = new XMLHttpRequest();
    peticionCrear.open("POST", rutaServidor + "/builds/crear");
    peticionCrear.setRequestHeader("Content-Type", "application/json");
    peticionCrear.onload = function () {
        if (peticionCrear.status === 200) {
            mostrarModalMensaje("Info", "Build creada correctamente.");
            console.log("Build creada correctamente.");
            const respuesta = JSON.parse(peticionCrear.responseText);
            obtenerBuildsDelUsuario()
            .then(builds => {
                console.log('Builds del usuario:', builds);
                // variable global
                listaBuilds = builds;
            })
            .catch(error => {
                console.error('Error al cargar las builds:', error);
            });
            document.getElementById("boton-imagen").classList.remove("oculto");
            document.getElementById("boton-borrar-imagen").classList.remove("oculto");
            document.getElementById("checkbox-publica").disabled = false;
            personaje.id = respuesta.build_id;
            actualizarPersonaje();
        } else {
            console.error("Error al crear build:", peticionCrear.responseText);
            mostrarModalMensaje("Error", peticionCrear.responseText || "Error al crear la build.");
        }
    };
    peticionCrear.onerror = function () {
        mostrarModalMensaje("Error", "No se pudo conectar con el servidor.");
    };
    peticionCrear.send(JSON.stringify(datosPeticionCrear));
}); // event listener para crear una build

document.getElementById("boton-imagen").addEventListener("click", () => {
    document.getElementById("input-imagen").click();
}); // llama al siguiente
document.getElementById("input-imagen").addEventListener("change", function () {
    const archivo = this.files[0];
    if (!archivo) return;

    const lector = new FileReader();
    lector.onload = function (e) {
        const imgElement = document.getElementById("imagen-a-recortar");
        imgElement.src = e.target.result;

        document.getElementById("cropper-modal").style.display = "block";

        if (cropper) cropper.destroy(); // Por si ya había uno antes
        cropper = new Cropper(imgElement, {
            aspectRatio: 1, // cuadrado
            viewMode: 0,
            autoCropArea: 1,
            movable: false,
            zoomable: true,
            scalable: false,
            cropBoxResizable: true
        });
    };
    lector.readAsDataURL(archivo);

});

document.getElementById("recortar-imagen").addEventListener("click", function () {
    const canvas = cropper.getCroppedCanvas({
        width: 600,
        height: 600
    });

    canvas.toBlob(function (blob) {
        const formData = new FormData();
        formData.append("imagen", blob, "imagen.png");
        formData.append("build_id", personaje.id);

        const peticionImagen = new XMLHttpRequest();
        peticionImagen.open("POST", rutaServidor + "/imagenes/guardar-imagen", true);

        peticionImagen.onload = function () {
            if (peticionImagen.status >= 200 && peticionImagen.status < 300) {
                try {
                    const respuesta = JSON.parse(peticionImagen.responseText);
                    console.log("Imagen subida correctamente:", respuesta);
                    mostrarModalMensaje("Info", "Imagen subida correctamente.");
                    personaje.imagen = 1;
                    actualizarPersonaje();
                } catch (error) {
                    console.error("Error al procesar respuesta:", error);
                    mostrarModalMensaje("Error", "Error procesando la respuesta del servidor.");
                }
            } else {
                console.error("Error al subir imagen:", peticionImagen.responseText);
                alert("Error al subir imagen.");
            }
        };

        peticionImagen.onerror = function () {
            console.error("Error de red al subir imagen.");
            alert("No se pudo conectar con el servidor.");
        };

        peticionImagen.send(formData);
        document.getElementById("cropper-modal").style.display = "none";
        cropper.destroy();
    }, "image/png");
});
document.getElementById("cropper-modal").addEventListener("click", function (e) {
    if (e.target === this) {
        cropper?.destroy();
        this.style.display = "none";
    }
}); // subir una imagen cropeada

document.getElementById("boton-borrar-imagen").addEventListener("click", () => {
    if (personaje.imagen == 1) {
        borrarImagen();
    } else {
        mostrarModalMensaje("Error", "Esa build no tiene imagen.");
    }
}); // borrar la imagen


function borrarImagen() {
    const peticionBorrar = new XMLHttpRequest();
    peticionBorrar.open("DELETE", rutaServidor + `/imagenes/borrar-imagen?build_id=${personaje.id}`);
    peticionBorrar.onload = function () {
        if (peticionBorrar.status === 200) {
            console.log("Imagen eliminada correctamente.");
            mostrarModalMensaje("Info", "Imagen eliminada correctamente.");
            personaje.imagen = 0;
            actualizarPersonaje();
        } else {
            console.error("Error al eliminar imagen:", peticionBorrar.responseText);
            mostrarModalMensaje("Error", peticionBorrar.responseText || "Ocurrió un error al eliminar la imagen.");
        }
    };
    peticionBorrar.onerror = function () {
        mostrarModalMensaje("Error", "No se pudo conectar con el servidor.");
    };
    peticionBorrar.send();
}

// ----------------------------------------------------------------- Ejecucion --------------------------------------------------------------------
console.log("Inicio Ejecucion");

obtenerArmas()
.then(armas => {
    console.log('Lista de armas:', armas);
    listaArmas = armas;
})
.catch(error => {
    console.error('Error al cargar las armas:', error);
}); // Obtener armas y guardarlas en un array

obtenerArmaduras()
.then(armaduras => {
    console.log('Lista de armaduras:', armaduras);
    listaArmaduras = armaduras;
})
.catch(error => {
    console.error('Error al cargar las armaduras:', error);
}); // Obtener armaduras y guardarlas en un array

obtenerAccesorios()
.then(accesorios => {
    console.log('Lista de accesorios:', accesorios);
    listaAccesorios = accesorios;
})
.catch(error => {
    console.error('Error al cargar los accesorios:', error);
}); // Obtener accesorios y guardarlos en un array

controlCheckbox();

// Comprueba si hay cookies
const sessionCookie = document.cookie.split('; ').find(row => row.startsWith('session_token='));
if (sessionCookie) {
    console.log('Sesión iniciada');
    // Si existe una sesion la renovamos para que se mantenga hasta 7 dias
    document.cookie = "session_token=" + sessionCookie.split('=')[1] + 
    "; path=/; max-age=" + (60 * 60 * 24 * 7) + "; SameSite=Lax";
    document.getElementById("texto-lista-build").classList.add("oculto");
    document.getElementById("boton-lista-builds").classList.remove("oculto");
    document.getElementById("botones-sesion").classList.add("oculto");
    document.getElementById("botones-cuenta").classList.remove("oculto");
    document.getElementById("botones-build").classList.remove("oculto");
    console.log("Usuario: " + sessionCookie.split('=')[1]);
    // Obtener rol del usuario
    obtenerRolUsuario(sessionCookie.split('=')[1])
    .then(rol => {
        console.log("Rol usuario: ", rol);
        rolUsuario = rol;
    })
    .catch(error => {
        console.error('Error al obtener el rol:', error);
    });
    // Obtener builds y guardarlas en un array
    obtenerBuildsDelUsuario()
    .then(builds => {
        console.log('Builds del usuario:', builds);
        // variable global
        listaBuilds = builds;
    })
    .catch(error => {
        console.error('Error al cargar las builds:', error);
    });
    document.getElementById("boton-imagen").style.display = "block";
    document.getElementById("boton-borrar-imagen").style.display = "block";
    document.getElementById("checkbox-publica").disabled = false;
} else {
    console.log('No hay sesión activa.');
    document.getElementById("texto-lista-build").classList.remove("oculto");
    document.getElementById("boton-lista-builds").classList.add("oculto");
    document.getElementById("botones-sesion").classList.remove("oculto");
    document.getElementById("botones-cuenta").classList.add("oculto");
    document.getElementById("botones-build").classList.add("oculto");
    document.getElementById("boton-imagen").style.display = "none";
    document.getElementById("boton-borrar-imagen").style.display = "none";
    document.getElementById("checkbox-publica").disabled = true;
}
console.log(document.cookie);
// Obtener builds publicas y guardarlas en un array
obtenerBuildsPublicas()
.then(builds => {
    console.log('Builds Publicas:', builds);
    // variable global
    listaBuildsPublicas = builds;
})
.catch(error => {
    console.error('Error al cargar las builds:', error);
});

document.getElementById("checkbox-publica").addEventListener("change", function () {
    personaje.publica = this.checked ? 1 : 0;
});

// Inicializar la UI al cargar la página
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("imagen-build").style.backgroundImage = `url('./media/builds/build-elfo.png')`;
    console.log("DOM cargado");
    // actualizarPersonaje();
});