"use strict";
let mongoose = require('mongoose');

mongoose.Promise = global.Promise;

module.exports = (config) => {
    var dbURI = config.dev.db;

    mongoose.connect(dbURI, {
        useMongoClient: true,
    }).then(() => {
        console.log(`Connected to ${dbURI}`);
    }).catch((e) => {
        throw e;
    });
};