class Build {
    constructor(
        id = null,
        user_id,
        nombre,
        nombre_pj,
        raza_id = null,
        clase_id = null,
        historia,
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
    ) {
        this.id = id;
        this.user_id = user_id;
        this.nombre = nombre;
        this.nombre_pj = nombre_pj;
        this.raza_id = raza_id;
        this.clase_id = clase_id;
        this.historia = historia;
        this.fuerza = fuerza;
        this.destreza = destreza;
        this.constitucion = constitucion;
        this.inteligencia = inteligencia;
        this.sabiduria = sabiduria;
        this.carisma = carisma;
        this.bonus1 = bonus1;
        this.bonus2 = bonus2;
        this.arma = arma;
        this.armadura = armadura;
        this.accesorio1 = accesorio1;
        this.accesorio2 = accesorio2;
        this.imagen = imagen;
        this.publica = publica;
    }
}


module.exports = Build;