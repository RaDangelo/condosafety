var mongoose = require('mongoose');

module.exports = mongoose.model('Vehicle', {
    plate: String,
    color: String,
    brand: String,
    status: Boolean,
    apartment: { type: Object, ref: 'Apartment' },
    picture: String
}, 'vehicle'
);
