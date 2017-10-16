'use strict';

const router = require('express').Router();
const mongoose = require('mongoose');

let conn = mongoose.connection;

var AfkTime = require('../models/afk-time.vo');
var daoAfk = require('../daos/afk-time.dao');

conn.once('open', () => {

    router.get('/', (req, res) => {
        daoAfk.getTime().then(time => res.json(time)).catch(err => res.send(err));
    });

    router.post('/', (req, res, next) => {
        daoAfk.getTime().then(time => {
            if (!time) {
                daoAfk.saveTime(new AfkTime(req.body)).then(data => res.json({ status: 200 })).catch(err => res.send(err));
            } else {
                time.time = req.param('time');
                daoAfk.saveTime(time).then(data => res.json({ status: 200 })).catch(err => res.send(err));
            }
        }).catch(err => {
            console.log('Erro ao cadastrar tempo de ociosidade: ' + err);
            return next(err);
        });
    });
});

module.exports = router;