var Vehicle = require('../models/vehicle.vo');
require('promise');

const VehicleDao = {
    getVehicles() {
        return Vehicle.find().exec();
    },
    getByPlate(plate) {
        return Vehicle.findOne({ 'plate': plate }).exec();
    },
    getFiltered(plate, brand) {
        var query = {};
        if (plate) {
            query['plate'] = new RegExp(plate, "i");
        }
        if (brand) {
            query['brand'] = new RegExp(brand, "i");
        }
        return Vehicle.find(query).exec();
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