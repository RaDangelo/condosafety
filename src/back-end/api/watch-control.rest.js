'use strict';

const router = require('express').Router();
const mongoose = require('mongoose');

let conn = mongoose.connection;

var Watch = require('../models/watch-control.vo');
var daoWatch = require('../daos/watch-control.dao'),
    daoUser = require('../daos/user.dao');

conn.once('open', () => {
    router.post('/', (req, res, next) => {
        var username = null;
        var date = req.body.date;
        if (req.body.user && req.body.user.username) {
            username = req.body.user.username;
        }
        daoUser.getFiltered(username).then((users) => {
            daoWatch.getFiltered(req.body, users, date).then(w => res.json(w)).catch(err => res.send(err));
        }).catch(err => res.send(err));
    });

    router.post('/logout', (req, res, next) => {
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
