var mongoose = require('mongoose');

module.exports = mongoose.model('Apartment', {
    floor: Number,
    number: Number,
    status: Boolean,
    complex: String,
    type: String,
    vehicles: { type: Array, ref: 'Vehicle' },
}, 'apartment'
);