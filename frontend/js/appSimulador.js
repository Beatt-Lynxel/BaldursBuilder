console.log("Inicio Script Simulador");
// Listados de variables y arrays iniciales
const rutaServidor = "https://baldursbuilder.onrender.com";
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
    id: 0,
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
    accesorio2: null
};

let listaEnemigos = null;
let listaBuilds = [];
let listaBuildsPublicas = null;
let listaArmas = null;
let listaArmaduras = null;
let listaAccesorios = null;

let buildEscogida = null;
let build1 = null;

let enemigoEscogido = null;
let enemigo1 = null;

let combatePausado = false;
let combate = null;
let turnoJugador = true;

const personajeGuardado = localStorage.getItem("personajeGuardado");
personaje = personajeGuardado ? JSON.parse(personajeGuardado) : personaje; // importante
console.log("Personaje cargado:", personaje);
// caracteristicas = {
//     fuerza: personaje.fuerza,
//     destreza: personaje.destreza,
//     constitucion: personaje.constitucion,
//     inteligencia: personaje.inteligencia,
//     sabiduria: personaje.sabiduria,
//     carisma: personaje.carisma
// };

const armasGuardadas = localStorage.getItem("armasGuardadas");
const armadurasGuardadas = localStorage.getItem("armadurasGuardadas");
const accesoriosGuardados = localStorage.getItem("accesoriosGuardados");
listaArmas = armasGuardadas ? JSON.parse(armasGuardadas) : "No hay armas";
listaArmaduras = armadurasGuardadas ? JSON.parse(armadurasGuardadas) : "No hay armaduras";
listaAccesorios = accesoriosGuardados ? JSON.parse(accesoriosGuardados) : "No hay accesorios";

/*------------------------------------------------------------------------Funciones-------------------------------------------------------------------*/

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

function obtenerEnemigos() {
    return new Promise((resolve, reject) => {
        const peticion = new XMLHttpRequest();
        peticion.open('GET', rutaServidor + '/enemigos');

        peticion.addEventListener("load", function () {
            if (peticion.status >= 200 && peticion.status < 300) {
                try {
                    const respuesta = JSON.parse(peticion.responseText);
                    resolve(respuesta);
                } catch (error) {
                    reject(new Error('Error al procesar la respuesta: ' + error));
                }
            } else {
                reject(new Error(`Error al obtener los enemigos: ${peticion.responseText}`));
            }
        });
        peticion.addEventListener("error", function () {
            reject(new Error('No se pudo completar la solicitud. Por favor, intenta más tarde.'));
        });
        peticion.send();
    });
} // enemigos

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
}

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
}

function calcularVida(constitucion) {
    const valor = constitucion;
    const bono1 = personaje.bonus1 === constitucion ? 1 : 0;
    const bono2 = personaje.bonus2 === constitucion ? 2 : 0;
    let accesorio1 = 0;
    let accesorio2 = 0;
    if (personaje.accesorio1 != null) {
        accesorio1 = listaAccesorios[(personaje.accesorio1)-1].atributo === "constitucion" ? listaAccesorios[(personaje.accesorio1)-1].valor : 0;
    }
    if (personaje.accesorio2 != null) {
        accesorio2 = listaAccesorios[(personaje.accesorio2)-1].atributo === "constitucion" ? listaAccesorios[(personaje.accesorio2)-1].valor : 0;
    }
    console.log("Caracteristica: " + constitucion + ", Valor: " + valor + ", Bono1: " + bono1 + ", Bono2: " + bono2 + ", accesorio1: " + accesorio1 + ", accesorio2: " + accesorio2);
    const valorFinal = valor + bono1 + bono2 + accesorio1 + accesorio2;
    const modificador = calcularModificador(valorFinal);
    const vida = 7 + 10*(modificador + 5);
    return vida;
}
// Actualizar la UI
function actualizarUI() {
    //Atributos Pj por defecto
    let ataquePj = 6;
    let defensaPj = 10;
    let vidaPj = calcularVida(personaje.constitucion);
    document.getElementById("vida-personaje").textContent = vidaPj;
    // Actualizar Nombre de la build,Nombre, Raza y Clase
    document.getElementById("nombre-build").textContent = personaje.nombre;
    document.getElementById("nombre-personaje").textContent = personaje.nombre_pj;
    document.getElementById("raza-personaje").textContent = personaje.raza;
    document.getElementById("clase-personaje").textContent = personaje.clase;
    // actualizar ataque
    ataquePj = listaArmas[(personaje.arma)-1].ataque;
    document.getElementById("ataque-personaje").textContent = `${ataquePj} (${listaArmas[(personaje.arma)-1].atributo.substring(0, 3)})`;
    // actualizar defensa
    defensaPj = listaArmaduras[(personaje.armadura)-1].defensa;
    document.getElementById("defensa-personaje").textContent = defensaPj;

    
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
        console.log("Accesorio: " + listaAccesorios[(personaje.accesorio2)-1].nombre + "Caracteristica: " + caracteristica + ", Valor: " + valor + ", Bono1: " + bono1 + ", Bono2: " + bono2 + ", accesorio1: " + accesorio1 + ", accesorio2: " + accesorio2);
        
        const valorFinal = valor + bono1 + bono2 + accesorio1 + accesorio2;
        const modificador = calcularModificador(valorFinal);

        // Actualizar valores, modificadores y habilidades en la UI
        document.getElementById(`${caracteristica}-mod`).textContent = `(${modificador >= 0 ? "+" : ""}${modificador})`;
        document.getElementById(caracteristica).textContent = valorFinal;
        // Actualizar habilidades relacionadas con el modificador
        const habilidades = Array.from(document.querySelectorAll(`.${caracteristica}`));
        habilidades.forEach(habilidad => {
            habilidad.innerHTML = modificador;
        });
    });
} // UI

function calcularModificador(atributo) {
    return Math.floor((atributo - 10) / 2);
}

function actualizarVentanaCombate(build1, enemigo1, mensajeInicial = null) {
    const divEnemigo = document.getElementById("enemigo1");
    const divBuild = document.getElementById("build1");
    let imagenBuild1 = `../media/builds/build-${razas[build1.raza_id]}.png`;
    divEnemigo.innerHTML = `
        <h4>${enemigo1.nombre}</h4>
        <img src="../media/enemigos/enemigo${enemigo1.id}.png" alt="Imagen de ${enemigo1.nombre}" class="imagen-combatiente">
        <div class="barra-vida">
            <div class="vida" style="width:${(enemigo1.vidaActual / enemigo1.vida) * 100}%"></div>
        </div>
        <p>Vida: ${enemigo1.vidaActual}/${enemigo1.vida}</p>
    `;
    if (build1.imagen == 1) {
        imagenBuild1 = `${rutaServidor}/uploads/builds/build-${build1.id}.png`;
    }
    divBuild.innerHTML = `
        <h4>${build1.nombre_pj}</h4>
        <img src="${imagenBuild1}" alt="Imagen de ${build1.nombre_pj} (${clases[build1.clase_id]} - ${razas[build1.raza_id]})" class="imagen-combatiente">
        <div class="barra-vida">
            <div class="vida" style="width:${(build1.vidaActual / build1.vida) * 100}%"></div>
        </div>
        <p>Vida: ${build1.vidaActual}/${build1.vida}</p>
    `;

    if (mensajeInicial) registrarEvento(mensajeInicial);
} // Función para actualizar las barras de vida y datos

function registrarEvento(texto) {
    const registro = document.getElementById("registro-combate");
    registro.innerHTML += `<p>${texto}</p>`;
    registro.scrollTop = registro.scrollHeight; // Scroll automático al final
} // Función para registrar lo que pasa en combate

function animacionAtaque(atacanteId, objetivoId, golpeExitoso = false) {
    const atacante = document.getElementById(atacanteId);
    const objetivo = document.getElementById(objetivoId);

    atacante.classList.add('atacando');

    if (golpeExitoso) {
        objetivo.classList.add('golpeado');
    } else {
        objetivo.classList.add('esquivar');
    }

    setTimeout(() => {
        atacante.classList.remove('atacando');
        if (golpeExitoso) {
            objetivo.classList.remove('golpeado');
        } else {
            objetivo.classList.remove('esquivar');
        }
    }, 1000); // 1 segundo para eliminar la animación
}



function iniciarCombate() {
    const intervaloAtaque = 2000; // cada 2s

    combate = setInterval(() => {
        const dado = Math.floor(Math.random() * 20) + 1;

        if (turnoJugador) {
            registrarEvento("Turno del jugador:");
            const ataqueTotal = dado + build1.bonificador;
            registrarEvento(`Tiras un dado de 20: ${dado} + bonificador (${build1.bonificador}) = ${ataqueTotal}`);
            registrarEvento(`Defensa enemigo: ${enemigo1.defensa}`);
            
            if (ataqueTotal >= enemigo1.defensa) {
                animacionAtaque('build1', 'enemigo1', true);
                if (dado === 20) {
                    registrarEvento(`¡Impacto crítico! Daño: ${build1.ataque + (2 * build1.bonificador)}.`);
                    enemigo1.vidaActual -= (build1.ataque + (2 * build1.bonificador));
                } else {                        
                    registrarEvento(`¡Impacto exitoso! Daño: ${build1.ataque + build1.bonificador}.`);
                    enemigo1.vidaActual -= (build1.ataque + build1.bonificador);
                }
                if (enemigo1.vidaActual <= 0) {
                    registrarEvento(`¡Has derrotado a ${enemigo1.nombre}!`);
                    clearInterval(combate);
                    combate = null;
                    enemigo1.vidaActual = 0;
                    document.getElementById("boton-pausar").classList.add("oculto");
                    document.getElementById("boton-continuar").classList.add("oculto");
                    document.getElementById("boton-detener").classList.add("oculto");
                    document.getElementById("boton-cerrar").classList.remove("oculto");
                }
                actualizarVentanaCombate(build1, enemigo1);
            } else {
                animacionAtaque('build1', 'enemigo1', false);
                registrarEvento("¡Fallaste el ataque!");
            }
        } else {
            registrarEvento(`Turno de ${enemigo1.nombre}:`);
            const ataqueTotal = dado + enemigo1.bonificador;
            registrarEvento(`Tira dado de 20: ${dado} + bonificador (${enemigo1.bonificador}) = ${ataqueTotal}`);
            
            if (ataqueTotal >= build1.defensa) {
                animacionAtaque('enemigo1', 'build1', true);
                if (dado === 20) {
                    registrarEvento(`¡Impacto crítico! Sufres ${enemigo1.ataque + enemigo1.bonificador} de daño.`);
                    build1.vidaActual -= (enemigo1.ataque + enemigo1.bonificador);
                } else {                        
                    registrarEvento(`¡Impacto exitoso! Sufres ${enemigo1.ataque} de daño.`);
                    build1.vidaActual -= enemigo1.ataque;
                }
                if (build1.vidaActual <= 0) {
                    registrarEvento("¡Has sido derrotado!");
                    clearInterval(combate);
                    combate = null;
                    build1.vidaActual = 0;
                    document.getElementById("boton-pausar").classList.add("oculto");
                    document.getElementById("boton-continuar").classList.add("oculto");
                    document.getElementById("boton-detener").classList.add("oculto");
                    document.getElementById("boton-cerrar").classList.remove("oculto");
                }
                actualizarVentanaCombate(build1, enemigo1);
            } else {
                animacionAtaque('enemigo1', 'build1', false);
                registrarEvento(`${enemigo1.nombre} falló su ataque.`);
            }
        }
        turnoJugador = !turnoJugador;
        registrarEvento(`-----------------`);
    }, intervaloAtaque);
} // combate

function renderizarBuilds(lista, contenedorDestino) {
    // foreach para meterlos en <div id="contenedor-lista-enemigos"></div> con nombre, vida, armadura, ataque y bonificador
    lista.forEach(build => {
        let atributoArma = "fuerza";
        if (build.arma != null) {
            atributoArma = listaArmas[(build.arma)-1].atributo;
        }
        const valorAtributo = build[atributoArma];
        const bono1 = build.bonus1 === atributoArma ? 1 : 0;
        const bono2 = build.bonus2 === atributoArma ? 2 : 0;
        let accesorio1 = 0;
        let accesorio2 = 0;
        if (build.accesorio1 != null) {
            accesorio1 = listaAccesorios[(build.accesorio1)-1].atributo === atributoArma ? listaAccesorios[(build.accesorio1)-1].valor : 0;
        }
        if (build.accesorio2 != null) {
            accesorio2 = listaAccesorios[(build.accesorio2)-1].atributo === atributoArma ? listaAccesorios[(build.accesorio2)-1].valor : 0;
        }
        console.log("Caracteristica: " + atributoArma + ", Valor: " + valorAtributo + ", Bono1: " + bono1 + ", Bono2: " + bono2 + ", accesorio1: " + accesorio1 + ", accesorio2: " + accesorio2);
        
        const valorFinal = valorAtributo + bono1 + bono2 + accesorio1 + accesorio2;
        if (build.arma != null) {
            build.ataque = listaArmas[(build.arma)-1].ataque;
        } else {
            build.ataque = 6;
        }
        build.bonificador = calcularModificador(valorFinal);
        if (build.armadura != null) {
            build.defensa = listaArmaduras[(build.armadura)-1].defensa;
        } else {
            build.defensa = 10;
        }
        build.vida = calcularVida(build.constitucion);
        
        // const contenedor = document.getElementById("contenedor-lista-builds");
        const itemElement = document.createElement("div");
        itemElement.classList.add("combatiente");
        itemElement.dataset.id = build.id;
    
        const nombre = document.createElement("div");
        nombre.classList.add("nombre");
        nombre.innerHTML = `${build.nombre_pj} <br> (${clases[build.clase_id]} - ${razas[build.raza_id]})`;
    
        const vida = document.createElement("div");
        vida.classList.add("vida");
        vida.textContent = `Vida: ${build.vida}`;
    
        const defensa = document.createElement("div");
        defensa.classList.add("defensa");
        defensa.textContent = `Defensa: ${build.defensa}`;
    
        const ataque = document.createElement("div");
        ataque.classList.add("ataque");
        ataque.textContent = `Ataque: ${build.ataque}`;
    
        const bonificador = document.createElement("div");
        bonificador.classList.add("bonificador");
        bonificador.textContent = `Bonificador: ${build.bonificador}`;

        itemElement.append(nombre, vida, defensa, ataque, bonificador);
        itemElement.addEventListener("click", () => {
            buildEscogida = itemElement.dataset.id;
            build1 = lista.find(e => e.id == buildEscogida);
            if (build1) {
                // Actualizamos el contenido
                document.getElementById("titulo-build1-escogida").innerHTML = `${build1.nombre_pj} <br> (${clases[build1.clase_id]} - ${razas[build1.raza_id]})`;
                if (build1.imagen == 1) {
                    document.getElementById("imagen-build1").src = `${rutaServidor}/uploads/builds/build-${build1.id}.png`;
                } else {
                    document.getElementById("imagen-build1").src = `../media/builds/build-${razas[build1.raza_id]}.png`
                }
                document.getElementById("imagen-build1").alt = `Imagen de ${build1.nombre_pj} (${clases[build1.clase_id]} - ${razas[build1.raza_id]})`;
                document.getElementById("vida-build1").textContent = `Vida: ${build1.vida}`;
                document.getElementById("defensa-build1").textContent = `Defensa: ${build1.defensa}`;
                document.getElementById("ataque-build1").textContent = `Ataque: ${build1.ataque}`;
                document.getElementById("bonificador-build1").textContent = `Bonificador: ${build1.bonificador}`;
            }
            document.getElementById("modal-builds").remove(); //Esta linea da error Uncaught ReferenceError: modalBuilds is not defined
            document.getElementById("contenedor-build1-seleccionada").classList.remove("oculto");
        });
        contenedorDestino.appendChild(itemElement);
    });
}

function mostrarModalBuilds() {
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

    const contenedorMisBuilds = document.createElement("div");
    const contenedorBuildsPublicas = document.createElement("div");
    // Rellenar ambas listas
    contenedorMisBuilds.classList.add("contenedor-modal");
    contenedorMisBuilds.innerHTML = `<h2>Mis Builds</h2>`;
    const buildsContainer = document.createElement("div");
    renderizarBuilds(listaBuilds, buildsContainer);
    contenedorMisBuilds.appendChild(buildsContainer)
    buildsContainer.classList.add("contenedor-lista-builds");

    contenedorBuildsPublicas.classList.add("contenedor-modal");
    contenedorBuildsPublicas.innerHTML = `<h2>Builds Publicas</h2>`;
    contenedorBuildsPublicas.classList.add("oculto");
    const publicasContainer = document.createElement("div");
    renderizarBuilds(listaBuildsPublicas, publicasContainer);
    publicasContainer.classList.add("contenedor-lista-builds");
    contenedorBuildsPublicas.appendChild(publicasContainer)
    

    // Contenedor de botones
    const botonera = document.createElement("div");
    botonera.classList.add("botones-modal");

    const btnMostrarPublicas = document.createElement("button");
    btnMostrarPublicas.textContent = "Builds Públicas";
    btnMostrarPublicas.classList.add("boton-superior")
    btnMostrarPublicas.onclick = () => {
        contenedorMisBuilds.classList.add("oculto");
        contenedorBuildsPublicas.classList.remove("oculto");
        btnMostrarPublicas.classList.add("oculto");
        btnMostrarPrivadas.classList.remove("oculto");
    };

    const btnMostrarPrivadas = document.createElement("button");
    btnMostrarPrivadas.textContent = "Mis Builds";
    btnMostrarPrivadas.classList.add("oculto","boton-superior");
    btnMostrarPrivadas.onclick = () => {
        contenedorBuildsPublicas.classList.add("oculto");
        contenedorMisBuilds.classList.remove("oculto");
        btnMostrarPrivadas.classList.add("oculto");
        btnMostrarPublicas.classList.remove("oculto");
    };

    const btnCancelar = document.createElement("button");
    btnCancelar.textContent = "Cancelar";
    btnCancelar.classList.add("boton-superior");
    btnCancelar.onclick = () => {
        modalBuilds.remove();
    };

    botonera.appendChild(btnMostrarPublicas);
    botonera.appendChild(btnMostrarPrivadas);
    botonera.appendChild(btnCancelar);
    
    modalBuildsContent.appendChild(contenedorMisBuilds);
    modalBuildsContent.appendChild(contenedorBuildsPublicas);
    modalBuildsContent.appendChild(botonera);
} // modalbuilds

function mostrarModalEnemigos() {
    // Crear modal si no existe
    let modalEnemigos = document.getElementById("modal-enemigos");
    if (!modalEnemigos) {
        modalEnemigos = document.createElement("div");
        modalEnemigos.id = "modal-enemigos";
        modalEnemigos.classList.add("modal-background");

        const modalContent = document.createElement("div");
        modalContent.id = "modal-content-enemigos";
        modalContent.classList.add("modal-content");

        modalEnemigos.appendChild(modalContent);
        document.body.appendChild(modalEnemigos);

        modalEnemigos.addEventListener("click", function (e) {
            if (e.target === modalEnemigos) {
                modalEnemigos.remove();
            }
        });
    }

    const modalContent = document.getElementById("modal-content-enemigos");
    const contenedorEnemigos = document.createElement("div");
    contenedorEnemigos.classList.add("contenedor-modal");
    contenedorEnemigos.innerHTML = `<h2>Lista Enemigos</h2>`;
    const contenedor = document.createElement("div");
    contenedor.classList.add("contenedor-lista-builds");

    listaEnemigos.forEach(enemigo => {
        const itemElement = document.createElement("div");
        itemElement.classList.add("combatiente");
        itemElement.dataset.id = enemigo.id;

        const nombre = document.createElement("div");
        nombre.classList.add("nombre");
        nombre.textContent = enemigo.nombre;

        const vida = document.createElement("div");
        vida.classList.add("vida");
        vida.textContent = `Vida: ${enemigo.vida}`;

        const defensa = document.createElement("div");
        defensa.classList.add("defensa");
        defensa.textContent = `Defensa: ${enemigo.defensa}`;

        const ataque = document.createElement("div");
        ataque.classList.add("ataque");
        ataque.textContent = `Ataque: ${enemigo.ataque}`;

        const bonificador = document.createElement("div");
        bonificador.classList.add("bonificador");
        bonificador.textContent = `Bonificador: ${enemigo.bonificador}`;

        itemElement.append(nombre, vida, defensa, ataque, bonificador);

        itemElement.addEventListener("click", () => {
            enemigo1 = listaEnemigos.find(e => e.id == itemElement.dataset.id);
            if (enemigo1) {
                document.getElementById("titulo-enemigo1-escogido").textContent = enemigo1.nombre;
                document.getElementById("imagen-enemigo1").src = `../media/enemigos/enemigo${enemigo1.id}.png`;
                document.getElementById("imagen-enemigo1").alt = `Imagen de ${enemigo1.nombre}`;
                document.getElementById("vida-enemigo1").textContent = `Vida: ${enemigo1.vida}`;
                document.getElementById("defensa-enemigo1").textContent = `Defensa: ${enemigo1.defensa}`;
                document.getElementById("ataque-enemigo1").textContent = `Ataque: ${enemigo1.ataque}`;
                document.getElementById("bonificador-enemigo1").textContent = `Bonificador: ${enemigo1.bonificador}`;
            }
            modalEnemigos.remove();
        });

        contenedor.appendChild(itemElement);
    });

    const botonCancelar = document.createElement("button");
    botonCancelar.textContent = "Cancelar";
    botonCancelar.classList.add("boton-superior");
    botonCancelar.onclick = () => {
        modalEnemigos.remove();
    };

    contenedorEnemigos.appendChild(contenedor);
    modalContent.appendChild(contenedorEnemigos);
    modalContent.appendChild(botonCancelar);
} // modal enemigos

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

/*-------------------------------------------------------------------------Listeners-------------------------------------------------------------------*/
// botones lista enemigos y cancelar
document.getElementById("elegir-enemigo1").addEventListener("click", ()=> {
    mostrarModalEnemigos();
});

// botones lista builds y cancelar
document.getElementById("elegir-build1").addEventListener("click", ()=> {
    mostrarModalBuilds();
});

document.getElementById("boton-iniciar").addEventListener("click", () => {
    if (build1 != null && enemigo1 != null) {
        // Inicializar la ventana de simulación
        console.log("Simulación iniciada...");
        console.log(JSON.stringify(build1));

        build1.vidaActual = build1.vida;
        enemigo1.vidaActual = enemigo1.vida;
        turnoJugador = true;

        document.getElementById("registro-combate").innerHTML = "";
        document.getElementById("ventana-simulacion").classList.remove("oculto");
        actualizarVentanaCombate(build1, enemigo1, "¡El combate comienza!");
        document.getElementById("boton-pausar").classList.remove("oculto");
        document.getElementById("boton-detener").classList.remove("oculto");
        document.getElementById("boton-iniciar").classList.add("oculto");
    
        document.getElementById("ventana-simulacion").classList.remove("oculto");
        document.getElementById("contenedor-builds").classList.add("oculto");
        document.getElementById("contenedor-enemigos").classList.add("oculto");
        iniciarCombate();
    } else {
        console.log("No puede haber un combate si no escoges una build y un enemigo.");
        mostrarModalMensaje("Info", "No puede haber un combate sin combatientes.");
    }
});


document.getElementById("boton-pausar").addEventListener("click", () => {
    if (combate && !combatePausado) {
        clearInterval(combate);
        combatePausado = true;
        registrarEvento("El combate ha sido pausado.");
    }
    document.getElementById("boton-pausar").classList.add("oculto");
    document.getElementById("boton-continuar").classList.remove("oculto");
}); // pausar combate

document.getElementById("boton-continuar").addEventListener("click", () => {
    if (combatePausado) {
        registrarEvento("El combate continúa...");
        registrarEvento(`-----------------`);
        combatePausado = false;
        iniciarCombate(); // Vuelve a llamar a la función de iniciar turnos
    }
    document.getElementById("boton-pausar").classList.remove("oculto");
    document.getElementById("boton-continuar").classList.add("oculto");
}); // continuar combate

document.getElementById("boton-detener").addEventListener("click", () => {
    if (combate) {
        clearInterval(combate);
        combate = null;
        combatePausado = false;
        registrarEvento("El combate ha sido detenido.");
    }
    document.getElementById("boton-pausar").classList.add("oculto");
    document.getElementById("boton-continuar").classList.add("oculto");
    document.getElementById("boton-detener").classList.add("oculto");
    document.getElementById("boton-cerrar").classList.remove("oculto");
}); // detener combate

document.getElementById("boton-cerrar").addEventListener("click", () => {
    document.getElementById("ventana-simulacion").classList.add("oculto");
    document.getElementById("contenedor-builds").classList.remove("oculto");
    document.getElementById("contenedor-enemigos").classList.remove("oculto");

    document.getElementById("boton-iniciar").classList.remove("oculto");
    document.getElementById("boton-cerrar").classList.add("oculto");
}); // ocultar coimbate


// Inicializar la UI al cargar la página
document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM cargado");
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
    
    obtenerEnemigos()
    .then(enemigos => {
        console.log('Lista de Enemigos:', enemigos);
        // variable global
        listaEnemigos = enemigos;
    })
    .catch(error => {
        console.error('Error al cargar las builds:', error);
    }); // obtener el listado de enemigos
    
    obtenerBuildsDelUsuario()
    .then(builds => {
        console.log('Lista de Builds:', builds);
        // variable global
        builds.forEach(build => {
            listaBuilds.push(build);
        });
    })
    .catch(error => {
        console.error('Error al cargar las builds:', error);
        console.log("Cargando build del almacenamiento local");
        personaje.id = 0;
        personaje.imagen = 0;
        listaBuilds.push(personaje);
    }); // obtener la lista de builds o si no está conectado la que se creó en la otra pagina
    
    obtenerBuildsPublicas()
    .then(builds => {
        console.log('Builds Publicas:', builds);
        // variable global
        listaBuildsPublicas = builds;
    })
    .catch(error => {
        console.error('Error al cargar las builds:', error);
    }); // listado de builds publicas

});