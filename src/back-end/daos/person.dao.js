var Person = require('../models/person.vo');
require('promise');

const PersonDao = {
    getPersons() {
        return Person.find().populate('personType').populate('apartment').exec();
    },
    getByDocument(cpf) {
        return Person.findOne({ 'cpf': cpf }).exec();
    },
    getFilteredDocument(cpf) {
        return Person.find({ 'cpf': new RegExp(cpf, "i") }).populate('apartment').exec();
    },
    getFilteredName(name) {
        return Person.find({ 'name': new RegExp(name, "i") }).populate('apartment').exec();
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