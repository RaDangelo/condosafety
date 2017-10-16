'use strict';

const router = require('express').Router();
const mongoose = require('mongoose');

let conn = mongoose.connection;

var PersonType = require('../models/person-type.vo');
var daoType = require('../daos/person-type.dao');

conn.once('open', () => {

    router.get('/', (req, res) => {
        daoType.getTypes().then(t => res.json(t)).catch(err => res.send(err));
    });

    router.post('/', (req, res, next) => {
        daoType.getByType(req.param('type')).then(type => {
            if (type) {
                console.log('Tipo de pessoa: ' + type.type + ' já cadastrado!');
                var err = new Error('Tipo de pessoa já cadastrado!');
                err.status = 500;
                return next(next);
            } else {
                daoType.saveType(new PersonType(req.body)).then(data => {
                    console.log('Tipo de pessoa cadastrado com sucesso!');
                    res.json({ status: 200 });
                }).catch(err => res.send(err));
            }
        }).catch(err => {
            console.log('Erro ao cadastrar tipo de pessoa: ' + err);
            return next(err);
        });
    });

    router.post('/delete', (req, res) => {
        daoType.deleteType(req.body._id).then(data => res.json({ status: 200 })).catch(err => res.send(err));
    });
});

module.exports = router;
