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
    },
    getFiltered(access) {
        var query = {};
        if (access.user && access.user.username) {
            query['user.username'] = access.user.username;
        }
        if (access.date) {
            query['date'] = access.date;
        }
        if (watch.apartment) {
            query['apartment'] = watch.apartment;
        }
        if (watch.vehicle) {
            query['vehicle'] = watch.vehicle;
        }
        if (watch.person) {
            query['person'] = watch.person;
        }
        if (watch.visitor) {
            query['visitor'] = watch.visitor;
        }
        if (watch.action) {
            query['action'] = watch.action;
        }
        console.log(query);
        return Watch.find(query).exec();
    },
}

module.exports = AccessDao;