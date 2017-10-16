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
    getFilteredName(name) {
        return Visitor.find({ 'name': new RegExp(name, "i") }).exec();
    },
    getFilteredDocument(document) {
        return Visitor.find({ 'document': new RegExp(document, "i") }).exec();
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
