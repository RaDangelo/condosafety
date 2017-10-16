var Apartment = require('../models/apartment.vo');
require('promise');

const ApartmentDao = {
    getApartments() {
        return Apartment.find().populate('vehicles').exec();
    },
    checkExistent(complex, number) {
        return Apartment.findOne({ 'complex': complex, 'number': number }).exec();
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