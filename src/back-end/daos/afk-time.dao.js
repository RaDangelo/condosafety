var AfkTime = require('../models/afk-time.vo');
require('promise');

const AfkTimeDao = {
    getTime() {
        return AfkTime.findOne().exec();
    },
    saveTime(time) {
        return new Promise(function (resolve, reject) {
            time.save(function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    },
}

module.exports = AfkTimeDao;