var PersonType = require('../models/person-type.vo');
require('promise');

const PersonTypeDao = {
    getTypes() {
        return PersonType.find().exec();
    },
    getByType(type) {
        return PersonType.findOne({ 'type': type }).exec();
    },
    saveType(type) {
        return new Promise(function (resolve, reject) {
            type.save(function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    },
    deleteType(id) {
        return PersonType.remove({ _id: id }).exec();
    }
}

module.exports = PersonTypeDao;
