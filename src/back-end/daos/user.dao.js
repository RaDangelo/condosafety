var User = require('../models/user.vo');

const UserDao = {
    getByUsername(username) {
        return User.findOne({ 'username': username }).exec();
    },
    getFiltered(username) {
        return User.find({ 'username': new RegExp(username, "i") }, '_id');
    }
}

module.exports = UserDao;
