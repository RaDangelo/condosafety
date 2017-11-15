'use strict';

const router = require('express').Router();
const mongoose = require('mongoose');

let conn = mongoose.connection;

var AfkTime = require('../models/afk-time.vo'),
    Watch = require('../models/watch-control.vo');
var daoAfk = require('../daos/afk-time.dao'),
    daoUser = require('../daos/user.dao'),
    daoWatch = require('../daos/watch-control.dao');

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

    router.post('/unfreeze-screen', (req, res, next) => {
        var watch = new Watch(req.body);
        daoUser.getByUsername(req.body.user.username).then(user => {
            if (!user) {
                console.log('Usuário ' + req.body.user.username + ' não encontrado!');
                var err = new Error('Usuário não existente!');
                err.status = 500;
                return next(err);
            } else {
                watch.user = user;
                daoWatch.saveWatch(watch).then(data => res.json(true)).catch(err => next(err));
            }
        });
    });

});

module.exports = router;