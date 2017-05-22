var mongoose = require('mongoose');

module.exports = mongoose.model('Vehicle', {
    plate: String,
    color: String,
    brand: String,
    status: Boolean,
    picture: { data: Buffer, contentType: String }
}, 'vehicle'
);
