var mongoose = require('mongoose');

module.exports = mongoose.model('Vehicle', {
    plate: String,
    color: String,
    brand: String,
    status: Boolean,
    apartment: { type: mongoose.Schema.Types.ObjectId, ref: 'Apartment' },
    picture: File
}, 'vehicle'
);
