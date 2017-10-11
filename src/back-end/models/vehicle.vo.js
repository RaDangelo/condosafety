var mongoose = require('mongoose');

module.exports = mongoose.model('Vehicle', {
    plate: String,
    color: String,
    brand: String,
    status: Boolean,
    picture: String,
    // picture: { type: File, FileSchema, collection: 'fs.files' },
    apartment: { type: Object, ref: 'Apartment' },
}, 'vehicle'
);
