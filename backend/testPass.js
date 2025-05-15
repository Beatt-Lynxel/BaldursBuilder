const bcrypt = require('bcrypt');

const hashPassword = async (password) => {
    const salts = 10;
    return await bcrypt.hash(password, salts);
};

module.exports = hashPassword;