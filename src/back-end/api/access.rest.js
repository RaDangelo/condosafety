'use strict';

const router = require('express').Router();
const mongoose = require('mongoose');
require('promise');

let conn = mongoose.connection;

var daoAccess = require('../daos/access.dao'),
    daoImg = require('../daos/image.dao'),
    daoUser = require('../daos/user.dao'),
    daoPerson = require('../daos/person.dao'),
    daoVehicle = require('../daos/vehicle.dao'),
    daoVisitor = require('../daos/visitor.dao'),
    daoApartment = require('../daos/apartment.dao');

var Person = require('../models/person.vo'),
    User = require('../models/user.vo'),
    Visitor = require('../models/visitor.vo'),
    Vehicle = require('../models/vehicle.vo'),
    Access = require('../models/access.vo'),
    Apartment = require('../models/apartment.vo');

var Crypto = require('../config/crypto');

conn.once('open', () => {

    router.post('/validate-pass', function (req, res, next) {
        let pass = req.param('password');

        daoUser.getByUsername(req.param('username')).then(user => {
            if (!user) {
                console.log('Usuário ' + req.param('username') + ' não encontrado!');
                var err = new Error('Usuário não existente!');
                err.status = 500;
                return next(err);
            } else if (!Crypto.isValidPassword(user, pass)) {
                console.log('Senha Inválida');
                var err = new Error('Senha inválida!');
                err.status = 401;
                return next(err);
            } else {
                return res.json(true);
            }
        }).catch(err => next(err));
    });

    router.post('/', function (req, res, next) {
        var access = new Access(req.body);
        daoUser.getByUsername(req.body.user.username).then(user => {
            if (!user) {
                console.log('Usuário ' + req.body.user.username + ' não encontrado!');
                var err = new Error('Usuário não existente!');
                err.status = 500;
                return next(err);
            } else {
                access.user = user;
                daoAccess.saveAccess(access).then(data => res.json(true)).catch(err => res.send(err));
            }
        }).catch(err => next(err));
    });

    router.get('/filter/:filter', function (req, res, next) {
        var filteredData = new Array();
        var promises = new Array();

        if (isNaN(req.params.filter)) {

            console.log('isNan');

            var visitors = new Promise((resolve, reject) => {
                let itemsProcessed = 0;
                daoVisitor.getFilteredName(req.params.filter).then(result => {
                    daoImg.getImages(result).then(v => {
                        if (v.length) {
                            v.forEach((item, index, array) => {
                                filteredData.push(item);
                                itemsProcessed++;
                                if (itemsProcessed === array.length) {
                                    resolve();
                                }
                            });
                        } else {
                            resolve();
                        }
                    }).catch(err => reject(err));
                }).catch(err => reject(err));
            });

            var persons = new Promise((resolve, reject) => {
                let itemsProcessed = 0;
                daoPerson.getFilteredName(req.params.filter).then(result => {
                    daoImg.getImages(result).then(p => {
                        if (p.length) {
                            p.forEach((item, index, array) => {
                                filteredData.push(item);
                                itemsProcessed++;
                                if (itemsProcessed === array.length) {
                                    resolve();
                                }
                            });
                        } else {
                            resolve();
                        }
                    }).catch(err => reject(err));
                }).catch(err => reject(err));
            });

            var vehicleBrand = new Promise((resolve, reject) => {
                let itemsProcessed = 0;
                daoVehicle.getFilteredBrand(req.params.filter).then(result => {
                    daoImg.getImages(result).then(v => {
                        if (v.length) {
                            v.forEach((item, index, array) => {
                                daoApartment.getByVehicle(item._id).then(apt => {
                                    if (apt) {
                                        item.apartment = new Apartment();
                                        item.apartment.complex = apt.complex;
                                        item.apartment.number = apt.number;
                                    }
                                    filteredData.push(item);
                                    itemsProcessed++;
                                    if (itemsProcessed === array.length) {
                                        resolve();
                                    }
                                }).catch(err => reject(err));
                            });
                        } else {
                            resolve();
                        }
                    }).catch(err => reject(err));
                }).catch(err => reject(err));
            });


            var vehiclePlate = new Promise((resolve, reject) => {
                let itemsProcessed = 0;
                daoVehicle.getFilteredPlate(req.params.filter).then(result => {
                    daoImg.getImages(result).then(v => {
                        if (v.length) {
                            v.forEach((item, index, array) => {
                                daoApartment.getByVehicle(item._id).then(apt => {
                                    if (apt) {
                                        item.apartment = new Apartment();
                                        item.apartment.complex = apt.complex;
                                        item.apartment.number = apt.number;
                                    }
                                    filteredData.push(item);
                                    itemsProcessed++;
                                    if (itemsProcessed === array.length) {
                                        resolve();
                                    }
                                }).catch(err => reject(err));
                            });
                        } else {
                            resolve();
                        }
                    }).catch(err => reject(err));
                }).catch(err => reject(err));
            });

            promises = [visitors, persons, vehicleBrand, vehiclePlate];
        } else {
            console.log('!isNan');

            var visitors = new Promise((resolve, reject) => {
                let itemsProcessed = 0;
                daoVisitor.getFilteredDocument(req.params.filter).then(result => {
                    daoImg.getImages(result).then(v => {
                        console.log('1');
                        if (v.length) {
                            v.forEach((item, index, array) => {
                                filteredData.push(item);
                                itemsProcessed++;
                                if (itemsProcessed === array.length) {
                                    console.log('2');
                                    resolve();
                                }
                            });
                        } else {
                            console.log('3');
                            resolve();
                        }
                    }).catch(err => reject(err));
                }).catch(err => reject(err));
            });


            var persons = new Promise((resolve, reject) => {
                let itemsProcessed = 0;
                daoPerson.getFilteredDocument(req.params.filter).then(result => {
                    daoImg.getImages(result).then(p => {
                        console.log('4');
                        if (p.length) {
                            p.forEach((item, index, array) => {
                                filteredData.push(item);
                                itemsProcessed++;
                                if (itemsProcessed === array.length) {
                                    console.log('5');
                                    resolve();
                                }
                            });
                        } else {
                            console.log('6');
                            resolve();
                        }
                    }).catch(err => reject(err));
                }).catch(err => reject(err));
            });

            promises = [visitors, persons];
        }
        Promise.all(promises).then(data => {
            res.json(filteredData);
        }).catch(err => res.send(err));
    });
});

module.exports = router;



