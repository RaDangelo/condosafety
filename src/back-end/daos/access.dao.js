var Access = require('../models/access.vo');
require('promise');

const AccessDao = {
    saveAccess(access) {
        return new Promise(function (resolve, reject) {
            access.save(function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }
}

module.exports = AccessDao;