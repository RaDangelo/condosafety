var Person = require('../models/person.vo');
require('promise');

const PersonDao = {
    getPersons() {
        return Person.find().populate('personType').populate('apartment').exec();
    },
    getByDocument(cpf) {
        return Person.findOne({ 'cpf': cpf }).exec();
    },
    getFiltered(cpf, name) {
        var query = {};
        if (cpf) {
            query['cpf'] = new RegExp(cpf, "i");
        }
        if (name) {
            query['name'] = new RegExp(name, "i");
        }
        return Person.find(query).populate('apartment').exec();
    },
    getById(id) {
        return Person.findById(id).exec();
    },
    savePerson(person) {
        return new Promise((resolve, reject) => {
            person.save(err => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    },
    deletePerson(id) {
        return Person.remove({ _id: id }).exec();
    }
}

module.exports = PersonDao;