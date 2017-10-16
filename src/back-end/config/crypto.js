var bCrypt = require('bcrypt-nodejs');

const Crypto = {
    isValidPassword(user, password) {
        return bCrypt.compareSync(password, user.password)
    },
    createHash(password) {
        return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
    }
}

module.exports = Crypto;