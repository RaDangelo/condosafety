var Apartment = require('../models/apartment.vo');
require('promise');

const ApartmentDao = {
    getApartments() {
        return Apartment.find().populate('vehicles').exec();
    },
    checkExistent(complex, number) {
        return Apartment.findOne({ 'complex': complex, 'number': number }).exec();
    },
    getFiltered(a) {
        var query = {};
        if (a.complex) {
            query['complex'] = new RegExp(a.complex, "i");
        }
        if (a.number) {
            query['number'] = new RegExp(a.number, "i");
        }
        if (a.floor) {
            query['floor'] = new RegExp(a.floor, "i");
        }

        return Apartment.find(query).exec();
    },
    getById(id) {
        return Apartment.findById(id).exec();
    },
    getByVehicle(vehicleId) {
        return Apartment.findOne({ 'vehicles': vehicleId }).exec();
    },
    saveApartment(apartment) {
        return new Promise((resolve, reject) => {
            apartment.save(err => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    },
    deleteApartment(id) {
        return Apartment.remove({ _id: id }).exec();
    }
}

module.exports = ApartmentDao;