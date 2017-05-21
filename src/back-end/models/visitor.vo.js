var mongoose = require('mongoose');

module.exports = mongoose.model('Visitor', {
    name: String,
    document: String,
    documentType: String,
    picture: File,
    obs: String,
}, 'visitor'
);
