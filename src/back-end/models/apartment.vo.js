var mongoose = require('mongoose');

module.exports = mongoose.model('Apartment', {
    floor: Number,
    number: Number,
    status: Boolean,
    complex: Number,
    type: String
}, 'apartment'
);