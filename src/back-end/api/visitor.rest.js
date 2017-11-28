'use strict';

const router = require('express').Router();
const mongoose = require('mongoose');

let conn = mongoose.connection;

var Visitor = require('../models/visitor.vo');
var daoVisitor = require('../daos/visitor.dao');

conn.once('open', () => {

    router.get('/', (req, res) => {
        daoVisitor.getVisitors().then(v => res.json(v)).catch(err => res.send(err));
    });

    router.post('/', (req, res, next) => {
        daoVisitor.getById(req.param('_id')).then(v => {
            if (!v) {
                daoVisitor.getByDocument(req.param('document')).then(visitorByDoc => {
                    if (visitorByDoc) {
                        console.log('Visitante com o documento: ' + visitorByDoc.document + ' já cadastrado!');
                        var err = new Error('Visitante já cadastrado!');
                        err.status = 500;
                        return next(err);
                    } else {
                        let visitor = new Visitor(req.body);
                        daoVisitor.saveVisitor(visitor).then(res.json(visitor._id)).catch(err => res.send(err));
                    }
                }).catch(err => next(err));
            } else {
                // atualiza visitante
                v.name = req.param('name');
                v.document = req.param('document');
                v.documentType = req.param('documentType');
                v.obs = req.param('obs');

                daoVisitor.saveVisitor(v).then(res.json(v._id)).catch(err => res.send(err));
            }
        }).catch(err => next(err));
    });

    // delete visitor
    router.post('/delete', (req, res) => {
        daoVisitor.deleteVisitor(req.body._id).then(data => res.json({ status: 200 })).catch(err => res.send(err));
    });
});

module.exports = router;
