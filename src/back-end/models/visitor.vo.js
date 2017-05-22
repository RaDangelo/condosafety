var mongoose = require('mongoose');

module.exports = mongoose.model('Visitor', {
    name: String,
    document: String,
    documentType: String,
    picture: { data: Buffer, contentType: String },
    obs: String,
}, 'visitor'
);
