'use strict';

const router = require('express').Router();
const mongoose = require('mongoose');

let conn = mongoose.connection;

var Apartment = require('../models/apartment.vo');
var daoApartment = require('../daos/apartment.dao');

conn.once('open', () => {

    router.get('/', (req, res) => {
        daoApartment.getApartments().then(ap => res.json(ap)).catch(err => res.send(err));
    });

    router.post('/', (req, res, next) => {

        daoApartment.getById(req.param('_id')).then(apt => {
            if (!apt) {
                daoApartment.checkExistent(req.param('complex'), req.param('number')).then(existentApartment => {
                    if (existentApartment) {
                        console.log('Apartamento no complexo: ' + req.param('complex') + ' de número:' + req.param('number') + ' já cadastrado!');
                        var err = new Error('Apartamento já cadastrado!');
                        err.status = 500;
                        return next(err);
                    } else {
                        console.log('AQUI');
                        daoApartment.saveApartment(new Apartment(req.body)).then(data => res.json({ status: 200 })).catch(err => res.send(err));
                    }
                }).catch(err => {
                    console.log('Erro ao cadastrar apartamento: ' + err);
                    return next(err);
                });
            } else {
                // atualiza apt
                apt.floor = req.param('floor');
                apt.number = req.param('number');
                apt.complex = req.param('complex');
                apt.type = req.param('type');
                console.log(req.param('vehicles'));
                if (req.param('vehicles')) {
                    apt.vehicles = req.param('vehicles');
                } else {
                    apt.vehicles = [];
                }
                apt.status = req.param('status');

                daoApartment.saveApartment(apt).then(data => res.json({ status: 200 })).catch(err => res.send(err));
            }
        }).catch(err => {
            console.log('Erro ao cadastrar apartamento: ' + err);
            return next(err);
        });
    });

    router.post('/delete', (req, res) => {
        daoApartment.deleteApartment(req.body._id).then(data => res.json({ status: 200 })).catch(err => res.send(err));
    });
});

module.exports = router;
