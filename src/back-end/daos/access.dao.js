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
    getFiltered(access, users, apartments, vehicles, people, visitors, date) {
        var query = {};
        console.log('aqui', users);
        if (date) {
            var start = new Date(date.substring(0, 4), date.substring(5, 7) - 1, date.substring(8, 10), 00, 00, 00, 00);
            var end = new Date(date.substring(0, 4), date.substring(5, 7) - 1, date.substring(8, 10), 00, 00, 00, 00);
            end.setDate(end.getDate() + 1);

            query['date'] = { $gte: start, $lt: end };
        }
        if (apartments) {
            query['apartment'] = { $in: apartments };
        }
        if (vehicles) {
            query['vehicle'] = { $in: vehicles };
        }
        if (people) {
            query['person'] = { $in: people };
        }
        if (visitors) {
            query['visitor'] = { $in: visitors };
        }
        if (access.action) {
            query['action'] = access.action;
        }
        if (access.type) {
            query['type'] = access.type;
        }
        if (users) {
            query['user'] = { $in: users };
        }
        console.log(query);
        return Access.find(query).populate('user', 'username').populate('vehicle', 'brand plate').populate('visitor', 'name document').
            populate('person', 'name cpf').populate('apartment', 'complex number').exec();
    },
}

module.exports = AccessDao;