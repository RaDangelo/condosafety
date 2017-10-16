var Vehicle = require('../models/vehicle.vo');
require('promise');

const VehicleDao = {
    getVehicles() {
        return Vehicle.find().exec();
    },
    getByPlate(plate) {
        return Vehicle.findOne({ 'plate': plate }).exec();
    },
    getFilteredPlate(plate) {
        return Vehicle.find({ 'plate': new RegExp(plate, "i") }).exec();
    },
    getFilteredBrand(brand) {
        return Vehicle.find({ 'brand': new RegExp(brand, "i") }).exec();
    },
    getById(id) {
        return Vehicle.findById(id).exec();
    },
    saveVehicle(vehicle) {
        return new Promise(function (resolve, reject) {
            vehicle.save(function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    },
    deleteVehicle(id) {
        return Vehicle.remove({ _id: id }).exec();
    }
}

module.exports = VehicleDao;