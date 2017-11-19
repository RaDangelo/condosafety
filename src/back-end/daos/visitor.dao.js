var Visitor = require('../models/visitor.vo');
require('promise');

const VisitorDao = {
    getVisitors() {
        return Visitor.find().exec();
    },
    getById(id) {
        return Visitor.findById(id).exec();
    },
    getByDocument(document) {
        return Visitor.findOne({ 'document': document }).exec();
    },
    getFiltered(name, document) {
        var query = {};
        if (document) {
            query['document'] = new RegExp(document, "i");
        }
        if (name) {
            query['name'] = new RegExp(name, "i");
        }
        return Visitor.find(query).exec();
    },
    saveVisitor(visitor) {
        return new Promise((resolve, reject) => {
            visitor.save(err => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    },
    deleteVisitor(id) {
        return Visitor.remove({ _id: id }).exec();
    }
}

module.exports = VisitorDao;
