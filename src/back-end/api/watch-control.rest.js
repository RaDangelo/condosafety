'use strict';

const router = require('express').Router();
const mongoose = require('mongoose');

let conn = mongoose.connection;

var Watch = require('../models/watch-control.vo');
var daoWatch = require('../daos/watch-control.dao'),
    daoUser = require('../daos/user.dao');

conn.once('open', () => {
    router.post('/', (req, res, next) => {

        if (req.body.user && req.body.user.username) {
            daoUser.getFiltered(req.body.user.username).then((users) => {
                daoWatch.getFiltered(req.body, users).then(w => res.json(w)).catch(err => res.send(err));
            }).catch(err => res.send(err));
        }

    });
});

module.exports = router;
