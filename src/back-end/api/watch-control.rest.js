'use strict';

const router = require('express').Router();
const mongoose = require('mongoose');

let conn = mongoose.connection;

var Watch = require('../models/watch-control.vo');
var daoWatch = require('../daos/watch-control.dao');

conn.once('open', () => {
    router.post('/', (req, res, next) => {
        daoWatch.getFiltered(new Watch(req.body)).then(w => res.json(w)).catch(err => res.send(err));
    });
});

module.exports = router;
