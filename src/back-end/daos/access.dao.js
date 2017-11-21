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
    getFiltered(access, users, apartments, vehicles, people, visitors) {
        var query = {};
        if (users && users.length) {
            query['user'] = { $in: users };
        }
        if (access.date) {
            query['date'] = access.date;
        }
        if (apartments && apartments.length) {
            query['apartment'] = { $in: apartments };
        }
        if (vehicles && vehicles.length) {
            query['vehicle'] = { $in: vehicles };
        }
        if (people && people.length) {
            query['person'] = { $in: people };
        }
        if (visitors && visitors.length) {
            query['visitor'] = { $in: visitors };
        }
        if (access.action) {
            query['action'] = access.action;
        }
        if (access.type) {
            query['type'] = access.type;
        }
        console.log(query);
        return Access.find(query).populate('user', 'username').populate('vehicle', 'brand plate').populate('visitor', 'name document').
            populate('person', 'name cpf').populate('apartment', 'complex number').exec();
    },
}

module.exports = AccessDao;