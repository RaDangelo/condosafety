var User = require('../models/user.vo');

const UserDao = {
    getByUsername(username) {
        return User.findOne({ 'username': username }).exec();
    }
}

module.exports = UserDao;
