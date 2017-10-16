var Visitor = require('../models/visitor.vo');
require('promise');

const VisitorDao = {
    getFilteredName(name) {
        return Visitor.find({ 'name': new RegExp(name, "i") }).exec();
    },
    getFilteredDocument(document) {
        return Visitor.find({ 'document': new RegExp(document, "i") }).exec();
    }
}

module.exports = VisitorDao;
