'use strict';

const router = require('express').Router();
const mongoose = require('mongoose');

let conn = mongoose.connection;

var Person = require('../models/person.vo');
var Crypto = require('../config/crypto');

var daoPerson = require('../daos/person.dao');
var daoImg = require('../daos/image.dao');

conn.once('open', () => {

    // Get all persons
    router.get('/', (req, res) => {
        daoPerson.getPersons().then(p => {
            if (p) {
                daoImg.getImages(p).then(data => res.json(data)).catch(err => res.send(err));
            } else {
                res.send('Nenhuma pessoa encontrada!');
            }
        }).catch(error => res.send(error));
    });

    // Save or Update person
    router.post('/', (req, res, next) => {

        daoPerson.getById(req.param('_id')).then(p => {
            if (!p) {
                daoPerson.getByDocument(req.param('cpf')).then(personByDocument => {
                    if (personByDocument) {
                        console.log('Pessoa com o documento: ' + req.param('cpf') + ' já cadastrada!');
                        var err = new Error('Pessoa já cadastrada!');
                        err.status = 500;
                        return next(err);
                    } else {
                        let person = new Person(req.body);
                        person.accessPassword = Crypto.createHash(person.accessPassword);
                        daoPerson.savePerson(person).then(data => res.json(person._id)).catch(err => res.send(err));
                    }
                }).catch(err => {
                    console.log('Erro ao cadastrar pessoa: ' + err);
                    return next(err);
                })
            } else {
                // atualiza pessoa
                p.name = req.param('name');
                p.nickname = req.param('nickname');
                if (p.accessPassword === req.param('accessPassword')) {
                    p.accessPassword = req.param('accessPassword');
                } else {
                    p.accessPassword = Crypto.createHash(req.param('accessPassword'));
                }
                p.phoneNumber = req.param('phoneNumber');
                p.cpf = req.param('cpf');
                p.email = req.param('email');
                p.status = req.param('status');
                p.personType = req.param('personType');
                p.apartment = req.param('apartment');

                daoPerson.savePerson(p).then(data => res.json(p._id)).catch(err => res.send(err));
            }
        }).catch(err => {
            console.log('Erro ao cadastrar pessoa: ' + err);
            return next(err);
        });;
    });

    router.post('/delete', (req, res) => {
        daoPerson.deletePerson(req.body._id).then(data => res.json({ status: 200 })).catch(err => res.send(err));
    });
});

module.exports = router;

