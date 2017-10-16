'use strict';

const router = require('express').Router();
const mongoose = require('mongoose');

let conn = mongoose.connection;

var Vehicle = require('../models/vehicle.vo');
var daoVehicle = require('../daos/vehicle.dao');
var daoImg = require('../daos/image.dao');

conn.once('open', () => {

    // Get all vehicles
    router.get('/', (req, res) => {
        daoVehicle.getVehicles().then(v => {
            if (v) {
                daoImg.getImages(v).then(data => res.json(data)).catch(err => res.send(err));
            } else {
                res.send('Nenhum veículo encontrado!');
            }
        }).catch(error => res.send(error));
    });

    // Save or Update vehicle
    router.post('/', (req, res, next) => {

        daoVehicle.getById(req.param('_id')).then(v => {
            let vehicle;
            if (!v) {
                daoVehicle.getByPlate(req.param('plate')).then(vehiclesByPlate => {
                    if (vehiclesByPlate) {
                        console.log('Veículo já cadastrado!');
                        var err = new Error('Veículo já cadastrado!');
                        err.status = 500;
                        return next(err);
                    } else {
                        daoVehicle.saveVehicle(new Vehicle(req.body)).then(data => res.json({ status: 200 })).catch(err => res.send(err));
                    }
                }).catch(err => {
                    console.log('Erro ao cadastrar veículo: ' + err);
                    return next(err);
                })
            } else {
                // atualiza veiculo
                v.plate = req.param('plate');
                v.brand = req.param('brand');
                v.color = req.param('color');
                v.status = req.param('status');
                daoVehicle.saveVehicle(v).then(data => res.json({ status: 200 })).catch(err => res.send(err));
            }
        }).catch(err => {
            console.log('Erro ao cadastrar veículo: ' + err);
            return next(err);
        });
    });

    // Delete vehicle
    router.post('/delete', (req, res) => {
        daoVehicle.deleteVehicle(req.body._id).then(data => res.json({ status: 200 })).catch(err => res.send(err));
    });

});

module.exports = router;