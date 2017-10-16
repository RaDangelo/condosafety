var mongoose = require('mongoose');

module.exports = mongoose.model('Visitor', {
    name: String,
    document: String,
    documentType: String,
    picture: String,
    obs: String,
}, 'visitor'
);
