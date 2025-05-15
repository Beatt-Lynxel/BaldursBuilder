class User {
    constructor(email, password) {
        this.email = email;
        this.password = password;
        this.rol = 1;
        this.activo = 1;
    }
}

module.exports = User;