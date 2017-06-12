var mongoose = require('mongoose');

module.exports = mongoose.model('Vehicle', {
    plate: String,
    color: String,
    brand: String,
    status: Boolean,
    // type: ENUM
    picture: { data: Buffer, contentType: String },
    apartment: { type: Object, ref: 'Apartment' },
}, 'vehicle'
);
