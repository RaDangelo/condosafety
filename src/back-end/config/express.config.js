"use strict";

const logger = require('morgan'),
    express = require('express'),
    bodyParser = require('body-parser'),  // pull information from HTML POST (express4)
    busboyBodyParser = require('busboy-body-parser');


module.exports = (app) => {
    app.use(logger('dev'));
    app.use((req, res, next) => {
        // res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE, OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Origin, Accept, X-Requested-With, Content-Type, Authorization');
        res.header('Access-Control-Allow-Credentials', true);
        next();
    });
    app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
    app.use(busboyBodyParser({ limit: '30mb' }));
    app.use(bodyParser.urlencoded({ 'extended': 'true' }));            // parse application/x-www-form-urlencoded
    app.use(bodyParser.json());                                     // parse application/json
    app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json

    //[*]Routes Configuration
    let person = require('../api/person.rest.js');
    let apartment = require('../api/apartment.rest.js');
    let access = require('../api/access.rest.js');
    let personType = require('../api/person-type.rest.js');
    let afk = require('../api/afk-time.rest.js');
    let vehicle = require('../api/vehicle.rest.js');
    let visitor = require('../api/visitor.rest.js');

    // app.use('/person', person);
    // app.use('/apartment', apartment);
    // app.use('/access', access);
    // app.use('/person-type', personType);
    // app.use('/afk-time', afk);
    app.use('/vehicle', vehicle);
    // app.use('/visitor', visitor);

};





// app.use(function (req, res, next) {

//     // Website you wish to allow to connect

//     if ('OPTIONS' === req.method) {
//         res.send(200);
//     }
//     else {
//         next();
//     }
// });